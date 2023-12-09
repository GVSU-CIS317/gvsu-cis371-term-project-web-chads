
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import für die Navigation
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import GroupChatSidebar from "./GroupChatSidebar"; // Import the new component

const Sidebar = () => {
  const [showGroups, setShowGroups] = useState(false); // State to toggle between chats and groups
  const navigate = useNavigate(); // Hook für die Navigation

  const handleCreateGroup = () => {
    navigate("/create-group"); // Navigieren zur CreateGroupPage
  };

  return (
    <div className="sidebar">
      <Navbar />
      <Search />

      <div className="chat-toggle">
        <button onClick={() => setShowGroups(false)}>Chats</button>
        <button onClick={() => setShowGroups(true)}>Groups</button>
        <button onClick={handleCreateGroup}>Create Group</button> {/* Neuer Button */}
      </div>

      {showGroups ? <GroupChatSidebar /> : <Chats />}
    </div>
  );
};

export default Sidebar;
