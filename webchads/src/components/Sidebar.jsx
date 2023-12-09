// import React from "react";
// import Navbar from "./Navbar"
// import Search from "./Search"
// import Chats from "./Chats"

// const Sidebar = () => {
//   return (
//     <div className="sidebar">
//       <Navbar />
//       <Search/>
//       <Chats/>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import GroupChatSidebar from "./GroupChatSidebar"; // Import the new component

const Sidebar = () => {
  const [showGroups, setShowGroups] = useState(false); // State to toggle between chats and groups

  return (
    <div className="sidebar">
      <Navbar />
      <Search />

      <div className="chat-toggle">
        <button onClick={() => setShowGroups(false)}>Chats</button>
        <button onClick={() => setShowGroups(true)}>Groups</button>
      </div>

      {showGroups ? <GroupChatSidebar /> : <Chats />}
    </div>
  );
};

export default Sidebar;
