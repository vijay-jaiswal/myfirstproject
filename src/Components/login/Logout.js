import React from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";

function Logout() {
  let navigate = useNavigate();

  //.................ONCLICK EVENT(LOGOUT).....................
  const handleLogout = async (e) => {
    e.preventDefault();
    await signOut(auth);
    swal("successfully logout!", "You clicked at logout!", "success");
    const timer = setTimeout(() => {
      navigate("/");
    }, 500);
    return () => {
      clearTimeout(timer);
    };
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
