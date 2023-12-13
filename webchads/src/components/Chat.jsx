import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { doc, deleteDoc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../firebase";

const Chat = () => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const handleDeleteChat = async () => {
    console.log("asd");
    const userOne = currentUser.uid;
    const userTwo = data.user.uid;
    const chat = data.chatId;
    console.log(userOne);
    console.log(userTwo);
    console.log(chat);
    // delete chat from chats
    await deleteDoc(doc(db, "chats", chat));
    //delete chat in userOne from userChats
    const userOneRef = doc(db, "userChats", userOne);
    const updateObject = {};
    updateObject[chat] = deleteField();
    await updateDoc(userOneRef, updateObject);
    //delete chat in userOne from userChats
    const userTwoRef = doc(db, "userChats", userTwo);
    await updateDoc(userTwoRef, updateObject);
  };

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        {data.user.displayName && (
          <button onClick={handleDeleteChat}>Delete Chat</button>
        )}
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
