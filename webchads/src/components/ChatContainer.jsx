import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import axios from "axios";
import {sendMessageRoute, receiveMessageRoute, logoutRoute} from "../utils/APIRoutes";
import ChatTyping from "./ChatTyping";
import {useNavigate} from "react-router-dom";
import {marked}  from "marked";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_KEY)
    );

    const response = await axios.post(receiveMessageRoute, {
      from: data._id,
      to: currentChat._id,
      type: currentChat.name?"group":"private"
    });
    setMessages(response.data);
  }, [currentChat]);

  const handleSendTyping = async() => {
    const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_KEY)
    );
    socket.current.emit("typing", {
      to: currentChat._id,
      fromID: data._id,
      fromName: data.username,
      type: getChatType()
    });
  };

  const getChatType = () => {
    return currentChat.name?"group":"private";
  };

  const handleLogout = async () => {
    const id = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_KEY)
    )._id;
    const data = await axios.post(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");

    }
  };
  const handleSendMsg = async (msg) => {
    const date = new Date().toISOString();
    if(!/\S/.test(msg))
      return;
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_KEY)
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      fromID: data._id,
      fromName: data.username,
      msg,
      created: date,
      type: getChatType()
    });
    await axios.post(sendMessageRoute, {
      fromID: data._id,
      fromName: data.username,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromUsername: data.username, fromSelf: true, message: msg, created: date });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", async (data) => {
        const user = await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_KEY)
        );
        // damit bin ich nicht happy
         if (user._id !== data.fromID) {
          setArrivalMessage({fromUsername: data.fromName, fromSelf: false, message: data.msg, created: data.created});
         }
      });
    }
  }, []);
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getTime = (message) => {
    const date = new Date(message.created);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    return `${hours}:${minutes}`;
  }
  return (
    <Container>

      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            {currentChat.username ?
                <img
                    src={`data:image/svg+xml;base64,${currentChat.profilePic}`}
                    alt=""
                />
                : null
            }
          </div>
          <div className="username">
            <h3>{currentChat.username?currentChat.username:currentChat.name}</h3>
          </div>
        </div>
        <Logout handleLogout={handleLogout}/>
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "received"
                }`}
              >
                <div className="content "
                  dangerouslySetInnerHTML={{
                    __html: (currentChat.name?`<p class="username">${message.fromSelf?"":message.fromUsername}</p>`:"") + marked.parse(message.message,[]) + `<p class="time">${getTime(message)}</p>`
                }}
                />
              </div>
          );
        })}
        <div ref={scrollRef} />
      </div>
      <ChatTyping socket={socket}/>
      <ChatInput handleSendMsg={handleSendMsg} handleSendTyping={handleSendTyping} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 5% 10%;
  overflow: hidden;
  
  .chat-header {
  background-color: #0d0d30;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
    display:flex;
    align-items: center;
      gap: 1rem;
      }
      .avatar {
        img {
          height: 2.5rem;
        }
      }
      .username {
      
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0.5rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.3rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {   
        max-width: 50%;
        overflow:hidden;
        white-space: pre-wrap;
        word-wrap: break-word; 
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .time {
    font-size: 0.8rem;
    }
    .username {
    font-weight: bold;
    font-size: 1.2rem;
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #ffffff34;
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: #ffffff34;
      }
    }
  }
`;