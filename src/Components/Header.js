import React from "react";
import Logout from "./Logout";

function Header(props) {
  const Url = window.location.pathname;

  if (Url === "/edit") {
    return (
      <div>
        <nav class="navbar fixed-top navbar-light bg-primary">
          <div className="container-fluid">
            <h6 className="navbar-brand  justify-content-center text-uppercase align-content-center">
              vbook
            </h6>

            <form className="d-flex">
              <button
                className="btn btn-outline-danger text-black bg-success"
                onClick={props.home}
                type="submit"
              >
                HOME
              </button>
              <Logout></Logout>
            </form>
          </div>
        </nav>
      </div>
    );
  } else if (Url === "/profile") {
    return (
      <div>
        <nav class="navbar fixed-top navbar-light bg-primary">
          <div className="container-fluid">
            <h6 className="navbar-brand  justify-content-center text-uppercase align-content-center">
              vbook
            </h6>

            <form className="d-flex">
              <button
                className="btn btn-outline-danger text-black bg-success"
                onClick={props.edit}
                type="submit"
              >
                EDIT
              </button>

              <button
                className="btn btn-outline-danger text-black bg-secondary"
                onClick={props.home}
                type="submit"
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
        <nav class="navbar fixed-top navbar-light bg-primary">
          <div className="container-fluid">
            <h6 className="navbar-brand  justify-content-center text-uppercase align-content-center">
              vbook
            </h6>
            <form className="d-flex">
              <button
                className="btn btn-outline-danger text-black bg-success"
                onClick={props.profile}
                type="submit"
              >
                PROFILE
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
