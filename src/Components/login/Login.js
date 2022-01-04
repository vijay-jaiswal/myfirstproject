import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authenticate } from "../../App";
import "./Login.css";
import { db } from "../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
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
  const [users, setUsers] = useState([]);
  const listCollectionRef = collection(db, "users");
  const accessFirebase = collection(db, "access");
  const userDetailFirebase = collection(db, "userDetail");

  useEffect(() => {
    const getusers = async () => {
      const data = await getDocs(listCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data() })));
    };

    getusers();
  }, [listCollectionRef]);

  useEffect(() => {
    if (users && users.length > 0) {
      setLocalData(users);
    } else {
      setLocalData([]);
    }
  }, [users]);

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

      const matchData = localData.filter((elm) => {
        if (
          elm.email === loginCredentials.fields.user ||
          elm.phoneNumber === loginCredentials.fields.user
        ) {
          userDetail = elm;
          return true;
        }
      });

      if (matchData.length !== 0) {
        if (matchData[0].Password === loginCredentials.fields.password) {
          localStorage.setItem("access", true);
          addDoc(accessFirebase, {
            access: true,
          });
          addDoc(userDetailFirebase, {
            userDetail,
          });
          setLoginCredentials({
            fields: {
              user: "",
              password: "",
            },
            errors: {},
          });
          handleIsLogin();

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
