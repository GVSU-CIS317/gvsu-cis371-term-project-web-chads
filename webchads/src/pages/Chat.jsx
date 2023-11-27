import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import {allGroupsRoute, allUsersRoute, host} from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_KEY)
        )
      );
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(async () => {
    if (currentUser) {
      const interval = setInterval(async () =>
      {
        const data = await axios.post(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
        setGroups((await axios.get(allGroupsRoute)).data);

      }, 2000)

      return () => clearInterval(interval)
    }}, [currentUser]);

  const handleChatChange = (chat) => {
    if(currentChat)
    {
      socket.current.emit("leave", currentChat._id)
    }
    socket.current.emit("join",{from: currentUser._id, to:chat._id, type: chat.name?"group":"private"});
    setCurrentChat(chat);
  };
  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} groups={groups} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #fea49f;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #1561ad;
    display: grid;
    grid-template-columns: 25% 75%;
  }
`;