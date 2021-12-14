import React from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authenticate } from "../App";

function Logout() {
  const [isLogin, handleIsLogin] = useContext(authenticate);
  let navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("userLogin");
    localStorage.removeItem("access");
    handleIsLogin();

    localStorage.removeItem("userDetail");

    swal("successfully logout!", "You clicked at logout!", "success");

    navigate("/");
  }
  return (
    <div>
      <button
        className="btn btn-outline-danger text-black bg-danger"
        onClick={handleLogout}
        type="submit"
      >
        LOGOUT
      </button>
    </div>
  );
}

export default Logout;
