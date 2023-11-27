import React, {useState, useEffect} from "react";
import axios from "axios";
import styled from "styled-components";
import {useNavigate, Link, useParams} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {registerRoute} from "../utils/APIRoutes";
import { Buffer } from "buffer";
import loader from "../assets/loader.gif"



export default function Register() {
    const api = `https://api.multiavatar.com/`;
    const navigate = useNavigate();
    const {user} = useParams();
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    const [values, setValues] = useState({
        username: user,
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [profilePic, setProfilePic] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (localStorage.getItem(process.env.REACT_APP_KEY)) {
            navigate("/");
        }
    }, []);

    const handleChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value});
    };

    const handleValidation = () => {
        const {password, confirmPassword, username, email} = values;
        if (password !== confirmPassword) {
            toast.error(
                "Die Passwörter stimmen nicht überein.",
                toastOptions
            );
            return false;
        } else if (password.length < 6) {
            toast.error(
                "Dein Passwort muss mehr als 6 Zeichen enthalten.",
                toastOptions
            );
            return false;
        } else if (email === "") {
            toast.error("Du musst eine email angeben.", toastOptions);
            return false;
        }

        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const {email, username, password} = values;
            const {data} = await axios.post(registerRoute, {
                username,
                email,
                password,
                profilePic
            });

            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            if (data.status === true) {
                localStorage.setItem(
                    process.env.REACT_APP_KEY,
                    JSON.stringify(data.user)
                );
                navigate("/");
            }
        }
    };
    const getProfilePic = async () => {
        const image = await axios.get(
            `${api}/${Math.round(Math.random() * 10000)}`);

        const buffer = new Buffer(image.data);
        setProfilePic(buffer.toString("base64"));
    }
    useEffect(async () => {
        await getProfilePic();
        setLoading(false);
    }, []);

    return (
        <>
            <FormContainer>
                {loading ?
                <img src={loader} alt="loader" className="loader" />

                :(
                <form action="" onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <h1>Webfuck</h1>
                    </div>
                    <div className="avatars">
                        <div
                            className={`avatar`}
                        >
                            <img
                                src={`data:image/svg+xml;base64,${profilePic}`}
                                alt="avatar"
                                onClick={getProfilePic}
                            />
                        </div>

                    </div>

                    <input
                        type="text"
                        //notfalllösung
                        value={values.username === "" ? user : values.username}
                        placeholder="Nutzername"
                        name="username"
                        maxLength={16}
                        onChange={(e) => handleChange(e)}
                    />
                    <input autoFocus
                           type="email"
                           placeholder="Email"
                           name="email"
                           onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="password"
                        placeholder="Passwort"
                        name="password"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="password"
                        placeholder="Bestätige dein Passwort"
                        name="confirmPassword"
                        onChange={(e) => handleChange(e)}
                    />
                    <button type="submit">Registrieren</button>
                    <span>
            Du hast bereits ein Account? <Link to="/login">Login.</Link>
          </span>
                </form>)}
            </FormContainer>
            <ToastContainer/>
        </>
    );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .avatars {
    display: flex;
    gap: 2rem;
     justify-content: center;
      align-items: center;
    .avatar {
        cursor: pointer;
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
     
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    }
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
