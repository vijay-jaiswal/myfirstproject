import React from "react";
import Logout from "./login/Logout";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const Url = window.location.pathname;
  let navigate = useNavigate();

  function routeEdit(e) {
    e.preventDefault();
    navigate("/edit");
  }

  function routeHome(e) {
    e.preventDefault();
    navigate("/home");
  }

  if (Url === "/edit") {
    return (
      <div>
        <nav className="navbar fixed-top navbar-light bg-primary">
          <div className="container-fluid">
            <h6 className="navbar-brand  justify-content-center text-uppercase align-content-center">
              vbook
            </h6>

            <form className="d-flex">
              <button
                className="btn btn-outline-danger text-black bg-success"
                onClick={routeHome}
                type="button"
              >
                HOME
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
            <h6 className="navbar-brand  justify-content-center text-uppercase align-content-center">
              vbook
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
