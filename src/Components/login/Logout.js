import React from "react";
import swal from "sweetalert";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { db, auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

import { deleteDoc, doc } from "firebase/firestore";
function Logout() {
  let navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else setUser(null);
    });
  }, []);

  const deleteAccess = async (id) => {
    const userDoc = doc(db, "access", id);
    await deleteDoc(userDoc);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    await signOut(auth);
    deleteAccess(user.uid);

    swal("successfully logout!", "You clicked at logout!", "success");

    navigate("/");
  };
  return (
    <div>
      <button
        className="btn btn-outline-danger text-black bg-danger"
        onClick={handleLogout}
        type="button"
      >
        LOGOUT
      </button>
    </div>
  );
}

export default Logout;
