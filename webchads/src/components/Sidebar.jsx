// import React, { useState } from "react";
import React from "react";
// import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import GroupChatSidebar from "./GroupChatSidebar"; // Import the new component

const Sidebar = () => {
  const showGroups = false; // State to toggle between chats and groups
  // const [showGroups, setShowGroups] = useState(false); // State to toggle between chats and groups
  // const navigate = useNavigate(); // Hook für die Navigation

  // const handleCreateGroup = () => {
  //   navigate("/create-group");
  // };

  return (
    <div className="sidebar">
      <Navbar />
      <Search />

      {showGroups ? <GroupChatSidebar /> : <Chats />}
    </div>
  );
};

export default Sidebar;
