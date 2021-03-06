import React from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { authenticate } from "../../App";
import { useContext } from "react";

function Logout() {
  let navigate = useNavigate();
  const [handleIsLogin] = useContext(authenticate);

  //.................ONCLICK EVENT(LOGOUT).....................
  const handleLogout = async (e) => {
    e.preventDefault();
    await signOut(auth);
    localStorage.removeItem("access");
    handleIsLogin();

    localStorage.removeItem("userDetails");
    localStorage.removeItem("id");
    localStorage.removeItem("userId");

    swal("successfully logout!", "You clicked at logout!", "success");
    navigate("/");
  };

  return (
    <div>
      <button className="btn   bg-white" onClick={handleLogout} type="button">
        <img src="logout.jpg" className="logout" alt="logout" />
      </button>
    </div>
  );
}

export default Logout;
