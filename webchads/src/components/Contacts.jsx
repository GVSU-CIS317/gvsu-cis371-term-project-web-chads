import React, {useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import {getOnlineUsersRoute} from "../utils/APIRoutes";
import {IoIosCreate} from "react-icons/io";
import CreateGroup from "./CreateGroup";


export default function Contacts({contacts, groups, changeChat}) {

    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const [onlineUsers, setOnlineUsers] = useState(new Map);
    const [showGroup, setShowGroup] = useState(false);
    const onClick = () => setShowGroup(!showGroup);

    useEffect(async () => {
        const data = await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_KEY)
        );
        setCurrentUserName(data.username);
    }, []);
    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };


   useEffect(()=> {
       const interval = setInterval(async () => {
           const {data} = await axios.get(getOnlineUsersRoute);
           setOnlineUsers(new Map(Object.entries(data)));
       }, 1000)
       return () => clearInterval(interval)
   }, []);



    return (
        <Container>
            <div className="brand">
                <h3>Webfuck</h3>
            <button onClick={onClick}>
                <IoIosCreate/>
            </button>
            </div>
            <div className="contacts">
                {showGroup?
                    <CreateGroup onClick={onClick}/>
                    :null}
                <h4>Gruppen</h4>
                {groups.map((group, index) => {
                    return (
                        <div
                            key={group._id}
                            className={`contact ${
                                index === currentSelected ? "selected" : ""
                            }`}
                            onClick={() => changeCurrentChat(index, group)}
                        >
                            <div className="username">
                                <h3>{group.name}</h3>
                            </div>
                        </div>
                    );
                })}
                <h4>Kontakte</h4>
                {contacts.map((contact, index) => {
                    return (
                        <div
                            key={contact._id}
                            className={`contact ${
                                (index+groups.length) === currentSelected ? "selected" : ""
                            }`}
                            onClick={() => changeCurrentChat((index+groups.length), contact)}
                        >
                            <div className="avatar">
                                <img
                                    src={`data:image/svg+xml;base64,${contact.profilePic}`}
                                    alt=""
                                />
                            </div>
                            <div className="username">
                                <h3>{contact.username}</h3>
                                {onlineUsers.get(contact._id) ?
                                    <span>online</span> : null}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="current-user">
                <div className="username">
                    <h2>{currentUserName}</h2>
                </div>
            </div>
        </Container>
    )

}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15% ;
  overflow: hidden;
  background-color: #080420;
  span {
  color:white;
  }
  .brand {
  button {
  align: center;
  display: flex;
  justify-content: center;
  align-items: center;
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
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
    gap: 1rem;
    &::-webkit-scrollbar {
      width: 0.5rem;
      &-thumb {
        background-color: #ffffff39;
        border-radius: 3rem;
      }
    }
    h4 {
        color: white;
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.1s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }
  

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    }
    .username {
      h2 {
        color: white;
      }
    }
  }
`;