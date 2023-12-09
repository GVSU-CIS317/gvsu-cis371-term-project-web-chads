import React from 'react';
import GroupChatListItem from './GroupChatListItem'; // Ensure this component exists and is correctly imported

const GroupChatSidebar = ({ groups, onGroupSelect }) => {
  if (!groups || groups.length === 0) {
    return <div>No group chats available.</div>;
  }

  return (
    <div className="group-chat-sidebar">
      {groups.map(group => (
        <GroupChatListItem key={group.id} group={group} onSelect={onGroupSelect} />
      ))}
    </div>
  );
};

export default GroupChatSidebar; // This is the default export
