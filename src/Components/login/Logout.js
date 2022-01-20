import React from "react";
import swal from "sweetalert";
import { useNavigate} from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { authenticate } from "../../App";
import { useContext} from "react";

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
