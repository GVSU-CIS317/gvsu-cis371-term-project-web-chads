import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const CreateGroupPage = ({ onSubmit }) => {
  const [groupName, setGroupName] = useState('');

  const handleSubmit = async () => {
    if (!groupName.trim()) {
      alert("Please enter a group name.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "groups"), {
        name: groupName,
        createdAt: new Date()
      });

      console.log("Group created with ID: ", docRef.id);

      onSubmit && onSubmit({ name: groupName });
    } catch (e) {
      console.error("Error creating group: ", e);
      alert("Error creating group.");
    }
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
      <button onClick={handleSubmit}>Create Group</button>
    </div>
  );
};

export default CreateGroupPage;
