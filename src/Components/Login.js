import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authenticate } from "../App";
import "../CSS/Login.css";

import Input from "./Input";
function Login(props) {
  const [isLogin, handleIsLogin] = useContext(authenticate);
  const [loginCredentials, setLoginCredentials] = useState({
    user: "",
    password: "",
  });
  const [localData, setLocalData] = useState("");
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");

  let navigate = useNavigate();
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("auth"));
    if (data && data.length > 0) {
      setLocalData(data);
    } else {
      setLocalData([]);
    }
  }, []);

  const setLoginData = (e) => {
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
  };

  function handleLogin(e) {
    e.preventDefault();
    let userDetail = {};
    if (loginCredentials.user.trim() === "") {
      setError("please enter user detail");
      return false;
    }
    if (loginCredentials.password.trim() === "") {
      setError1("please enter password");

      return false;
    }
    const matchData = localData.filter((d) => {
      if (
        d.email === loginCredentials.user ||
        d.phone === loginCredentials.user
      ) {
        userDetail = d;
        return true;
      }
    });

    if (matchData.length !== 0) {
      if (matchData[0].Password === loginCredentials.password) {
        handleIsLogin();
        localStorage.setItem("access", true);
        localStorage.setItem("userDetail", JSON.stringify(userDetail));

        setLoginCredentials({
          user: "",
          password: "",
        });
        setTimeout(() => {
          navigate("home");
        }, 500);
      } else {
        setError1("wrong password.");
      }
    } else {
      const d = `${loginCredentials.user} user not exist!`;
      setError1(d);
    }
  }
  return (
    <div className="container h-100">
      <div className="d-flex justify-content-center h-100">
        <div className="user_card">
          <div className="d-flex justify-content-center">
            <div className="brand_logo_container">
              <img src="draw22.png" className="brand_logo" alt="Logo" />
            </div>
          </div>
          <div className="d-flex justify-content-center form_container">
            <form>
              <div className="input-group mb-3">
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i className="fas fa-user"></i>
                  </span>
                  <Input
                    name={"user"}
                    type={"text"}
                    onChange={setLoginData}
                    placeholder={"enter email or phone no."}
                    value={loginCredentials.user}
                  />
                </div>

                <p className=" text-danger">{error}</p>
              </div>
              <div className="input-group mb-3 ">
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i className="fas fa-key"></i>
                  </span>
                  <Input
                    name={"password"}
                    type={"password"}
                    onChange={setLoginData}
                    placeholder={"enter password"}
                    value={loginCredentials.password}
                  />
                </div>

                <p className=" text-danger">{error1}</p>
              </div>
              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customControlInline"
                  />
                  <label
                    className="custom-control-label"
                    for="customControlInline"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-center mt-3 login_container">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleLogin}
                >
                  login
                </button>
              </div>
            </form>
          </div>

          <div className="mt-4">
            <div className="d-flex justify-content-center links">
              Don't have an account? <Link to="/signup">SIGNUP</Link>
            </div>
            <div className="d-flex justify-content-center links">
              <a href="#">Forgot your password?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
