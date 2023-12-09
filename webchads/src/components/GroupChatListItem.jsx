// GroupChatListItem.jsx
import React from 'react';

const GroupChatListItem = ({ group, onSelect }) => {
  return (
    <div className="group-chat-list-item" onClick={() => onSelect(group)}>
      <div className="group-name">{group.name}</div>
      {/* Add more group details if needed */}
    </div>
  );
};

export default GroupChatListItem;
