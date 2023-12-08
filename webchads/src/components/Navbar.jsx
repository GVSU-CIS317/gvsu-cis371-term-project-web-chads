import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="navbar">
      <span className="logo">WebChads</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />

        {currentUser.displayName}
        <button onClick={handleProfile}>Edit Profile</button>
        <button onClick={() => signOut(auth)}>logout</button>
      </div>
    </div>
  );
};

export default Navbar;
