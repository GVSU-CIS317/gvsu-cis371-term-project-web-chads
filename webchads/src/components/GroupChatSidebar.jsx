// GroupChatSidebar.jsx
import React from 'react';
import GroupChatListItem from './GroupChatListItem';

const GroupChatSidebar = ({ groups, onGroupSelect }) => {
  return (
    <div className="group-chat-sidebar">
      {groups.map(group => (
        <GroupChatListItem key={group.id} group={group} onSelect={onGroupSelect} />
      ))}
    </div>
  );
};

export default GroupChatSidebar;
