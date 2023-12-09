import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const CreateGroupPage = ({ onSubmit }) => {
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState([]); // Beispiel: ['user1', 'user2']

  const handleSubmit = async () => {
    if (!groupName.trim()) {
      alert("Please enter a group name.");
      return;
    }

    if (members.length === 0) {
      alert("Please add at least one member to the group.");
      return;
    }

    try {
      // Erstellen eines neuen Gruppenchat-Dokuments in Firestore
      const docRef = await addDoc(collection(db, "groups"), {
        name: groupName,
        members: members,
        createdAt: new Date()
      });

      console.log("Group created with ID: ", docRef.id);

      // Aufrufen des onSubmit-Callbacks mit den Gruppendaten
      onSubmit && onSubmit({ name: groupName, members });
    } catch (e) {
      console.error("Error creating group: ", e);
      alert("Error creating group.");
    }
  };

  // UI für die Auswahl der Mitglieder hinzufügen
  // Beispiel: Einfache Texteingabe, um Benutzer-IDs hinzuzufügen
  const handleAddMember = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      setMembers([...members, e.target.value.trim()]);
      e.target.value = ''; // Eingabefeld zurücksetzen
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
      <input
        type="text"
        placeholder="Add member (Press Enter)"
        onKeyPress={handleAddMember}
      />
      <div>Members: {members.join(', ')}</div>
      <button onClick={handleSubmit}>Create Group</button>
    </div>
  );
};

export default CreateGroupPage;
