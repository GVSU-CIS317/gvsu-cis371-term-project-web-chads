import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format the time as HH:mm
    const formattedTime = `${hours}:${minutes.toString().padStart(2, "0")}`;

    return formattedTime;
  };

  const createMarkup = (text) => {
    return { __html: text };
  };


  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>{formatDate(message.date)}</span>
      </div>
      <div className="messageContent">
        <div dangerouslySetInnerHTML={createMarkup(message.text)} />
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
