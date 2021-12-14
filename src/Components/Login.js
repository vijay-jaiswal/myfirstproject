import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authenticate } from "../App";

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
    <div className="container-fluid  " id="full">
      <div className="row  vh-100">
        <div className="col  vh-100">
          <h1 className="intro">
            hi buddy,
            <br />
            vbook help u to manage your daily work{" "}
          </h1>
          <img src="draw22.png" alt="www.google.com"></img>
        </div>
        <div className="col-auto  vh-100  " id="full1">
          <h1 id="strt"> Welcome to Vbook</h1>

          <div className="login_form">
            <div className="login">
              <label>User id:</label>
              <Input
                name={"user"}
                type={"text"}
                onChange={setLoginData}
                placeholder={"enter email or phone no."}
                value={loginCredentials.user}
              />
              <p className=" text-danger">{error}</p>
              <label>Password:</label>
              <Input
                name={"password"}
                type={"password"}
                onChange={setLoginData}
                placeholder={"enter password"}
                value={loginCredentials.password}
              />
              <p className=" text-danger">{error1}</p>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleLogin}
              >
                login
              </button>
            </div>

            <p>please signup if you are not existing user </p>
            <Link to="/signup">SIGNUP</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
