import styled from "styled-components";
import {IoIosCreate} from "react-icons/io";
import axios from "axios";
import {createGroupRoute} from "../utils/APIRoutes";
import {toast, ToastContainer} from "react-toastify";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function CreateGroup({onClick}) {
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    const [name, setName] = useState();
    const handleChange = (event) => {
        setName(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const {data} = await axios.post(createGroupRoute, {
            name
        });

        if (data.status === false) {
            return toast.error(data.msg, toastOptions);
        }
        onClick();

    };
        return (
            <Container>
                <form className="create" action="" onSubmit={(event) => handleSubmit(event)}>
                    <h4>Create Group</h4>
                    <input
                        type="text"
                        maxLength="40"
                        placeholder="Groupname"
                        name="groupname"
                        onChange={(e) => handleChange(e)}
                        min="3"
                    />
                    <button type="submit">Create</button>
                </form>
                <ToastContainer />
            </Container>
        );
}
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
     width: 90%;
       
        padding: 1rem;
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
     .create {
     display: flex;
    flex-direction: column;
    gap: 1rem;
       
       h4 {
       text-align: center;
    color: white;
    }
    
    button {
    display: grid;
    color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
  }
  input {
  
  }
  
`;