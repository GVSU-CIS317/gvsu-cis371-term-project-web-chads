import React, { useState, useContext } from "react";
import { updateProfile } from "firebase/auth";
import { db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const file = e.target[1].files[0];

    try {
      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      if (file) {
        console.log("file");
        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              //Update profile
              await updateProfile(currentUser, {
                displayName,
                photoURL: downloadURL,
              });
              //update user on firestore
              await updateDoc(doc(db, "users", currentUser.uid), {
                displayName,
                photoURL: downloadURL,
              });

              navigate("/");
            } catch (err) {
              console.log(err);
              setErr(true);
              setLoading(false);
            }
          });
        });
      } else {
        try {
          //Update profile
          await updateProfile(currentUser, {
            displayName,
          });
          //create user on firestore
          await updateDoc(doc(db, "users", currentUser.uid), {
            displayName,
          });

          navigate("/");
        } catch (err) {
          console.log(err);
          setErr(true);
          setLoading(false);
        }
      }
    } catch (err) {
      setErr(true);
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">WebChads Chat</span>
        <span className="title">Edit Profile</span>
        <form onSubmit={handleSubmit}>
          <span>Change your Name</span>
          <input
            required
            type="text"
            placeholder="Add a name"
            defaultValue={currentUser.displayName}
          />
          <span>Change your profile photo</span>
          <img src={currentUser.photoURL} alt="" />

          <input type="file" id="file" />
          <button disabled={loading}>Save Profile</button>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span>Something went wrong</span>}
        </form>
        <Link to="/">Go Back</Link>
      </div>
    </div>
  );
};

export default Profile;
