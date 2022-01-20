import React from "react";
import Logout from "./login/Logout";
import { useNavigate } from "react-router-dom";

function Header() {
  const Url = window.location.pathname;
  let navigate = useNavigate();

  function routeEdit(e) {
    e.preventDefault();
    navigate("/edit");
  }

  function routeTodolist(e) {
    e.preventDefault();
    navigate("/todolist");
  }
    var userDetails=(JSON.parse(localStorage.getItem("userDetails"))[0]);

  if (Url === "/edit") {
    return (
      <div>
        <nav className="navbar fixed-top navbar-light bg-primary">
          <div className="container-fluid">
            <h6 className="navbar-brand  justify-content-center  align-content-center">
             hi.. {userDetails.firstName}
            </h6>

            <form className="d-flex">
              <button
                className="btn btn-outline-danger text-black bg-success"
                onClick={routeTodolist}
                type="button"
              >
                TODOLIST
              </button>
              <Logout></Logout>
            </form>
          </div>
        </nav>
      </div>
    );
  } else {
    return (
      <div>
        <nav className="navbar fixed-top navbar-light bg-primary">
          <div className="container-fluid">
            <h6 className="navbar-brand  justify-content-center  align-content-center">
             hi.. {userDetails.firstName}
              
            </h6>
            <form className="d-flex">
              <button
                className="btn btn-outline-danger text-black bg-success"
                onClick={routeEdit}
                type="button"
              >
                EDIT
              </button>

              <Logout></Logout>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
