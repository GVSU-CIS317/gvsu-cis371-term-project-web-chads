// CreateGroupPage.jsx
import React, { useState } from 'react';

const CreateGroupPage = ({ onSubmit }) => {
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState([]); // You might want to fetch potential members

  const handleSubmit = () => {
    // Logic to submit the new group data
    onSubmit({ name: groupName, members });
  };

  return (
    <div className="create-group-page">
      <h2>Create a New Group</h2>
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      {/* Add UI components for selecting members */}
      <button onClick={handleSubmit}>Create Group</button>
    </div>
  );
};

export default CreateGroupPage;
