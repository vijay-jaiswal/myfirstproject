import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authenticate } from "../../App";
import "./Login.css";

import Input from "../Input";

function Login(props) {
  const [isLogin, handleIsLogin] = useContext(authenticate);
  const [loginCredentials, setLoginCredentials] = useState({
    fields: {
      user: "",
      password: "",
    },
    errors: {},
  });
  const [localData, setLocalData] = useState("");

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
    loginCredentials.fields[e.target.name] = e.target.value;
    setLoginCredentials({ ...loginCredentials });

    if (loginCredentials.errors[e.target.name]) {
      loginCredentials.errors[e.target.name] = "";
    }
    validate();
  };
  const validate = () => {
    let fields = loginCredentials.fields;
    let errors = {};
    let formIsValid = true;
    if (!fields["user"]) {
      formIsValid = false;
      errors["user"] = "*please enter user detail.";
    }
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*please enter password.";
    }
    loginCredentials.errors = errors;
    setLoginCredentials({ ...loginCredentials });
    return formIsValid;
  };

  function handleLogin(e) {
    if (validate()) {
      e.preventDefault();
      let userDetail = {};

      const matchData = localData.filter((d) => {
        if (
          d.email === loginCredentials.fields.user ||
          d.phoneNumber === loginCredentials.fields.user
        ) {
          userDetail = d;
          return true;
        }
      });

      if (matchData.length !== 0) {
        if (matchData[0].Password === loginCredentials.fields.password) {
          handleIsLogin();
          localStorage.setItem("access", true);
          localStorage.setItem("userDetail", JSON.stringify(userDetail));

          setLoginCredentials({
            fields: {
              user: "",
              password: "",
            },
            errors: {},
          });
          setTimeout(() => {
            navigate("home");
          }, 500);
        } else {
          loginCredentials.errors["password"] =
            "*wrong password,please type again";
        }
      } else {
        loginCredentials.errors["password"] = "*user detail not exist!";
      }
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
                    value={loginCredentials.fields.user}
                  />
                </div>

                {loginCredentials.errors.user && (
                  <p className=" text-danger">{loginCredentials.errors.user}</p>
                )}
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
                    value={loginCredentials.fields.password}
                  />
                </div>
                {loginCredentials.errors.password && (
                  <p className=" text-danger">
                    {loginCredentials.errors.password}
                  </p>
                )}
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
