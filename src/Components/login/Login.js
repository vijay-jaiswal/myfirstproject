import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { auth, db } from "../firebase-config";
import Input from "../Input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authenticate } from "../../App";
import { collection, getDocs } from "firebase/firestore";

function Login() {
  const [handleIsLogin] = useContext(authenticate);
  const [error, setError] = useState("");
  let navigate = useNavigate();
  const [loginCredentials, setLoginCredentials] = useState({
    user: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    error: {},
  });

  //.............................ONCHANGE EVENT................................
  const setLoginData = (e) => {
    loginCredentials[e.target.name] = e.target.value;
    setLoginCredentials({ ...loginCredentials });

    if (errors.error[e.target.name]) {
      errors.error[e.target.name] = "";
    }
    validate(e.target.name);
  };

  //...........................VALIDATION..............................
  const validate = (type) => {
    let errors = {};
    let formIsValid = true;
    switch (type) {
      case "user":
        if (!loginCredentials["user"]) {
          formIsValid = false;
          errors["user"] = "*please enter email.";
        }
        break;

      case "password":
        if (!loginCredentials["password"]) {
          formIsValid = false;
          errors["password"] = "*please enter password.";
        }
        break;
      default:
        break;
    }
    errors.error = errors;
    setErrors({ ...errors });
    return formIsValid;
  };

  // .........................ONCLICK EVENT(LOGIN).......................................
  const handleLogin = async (e) => {
    e.preventDefault();

    if (validate("user") && validate("password")) {
      try {
        const user = await signInWithEmailAndPassword(
          auth,
          loginCredentials.user,
          loginCredentials.password
        );
        localStorage.setItem("access", true);
        localStorage.setItem("id", JSON.stringify(user.user.uid));

        console.log("succesfully login");
        await getlist(user.user.uid);
        handleIsLogin();

        navigate("todolist");
      } catch (error) {
        setError(error.message);
      }
    }
  };

  //....................FETCHING DETAILS FROM FIREBASE....................................
  const getlist = async (id) => {
    const data = await getDocs(collection(db, "users", id, "userDetail"));
    let userdetail = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    userdetail.forEach((e) => {
      let userDetails = [];
      userDetails = [
        {
          firstName: e.firstName,
          lastName: e.lastName,
          phoneNumber: e.phoneNumber,
          gender: e.gender,
          
        },
      ];
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      localStorage.setItem("userId", JSON.stringify(e.id));

      
    });
  };

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
              <div className=" mb-3">
                <div className="input-group-append d-flex justify-content-center">
                  <div className="input-group-text">
                    <i className="fas fa-user"></i>
                  </div>
                  <div>
                    <Input
                      name="user"
                      type="text"
                      onChange={setLoginData}
                      placeholder="enter email "
                      value={loginCredentials.user}
                    />
                  </div>
                </div>

                <div>
                  {errors.error.user && (
                    <p className="text-center text-danger">
                      {errors.error.user}
                    </p>
                  )}
                </div>
              </div>
              <div className=" mb-3 ">
                <div className="input-group-append d-flex justify-content-center ">
                  <div className="input-group-text">
                    <i className="fas fa-key"></i>
                  </div>
                  <div>
                    <Input
                      name="password"
                      type="password"
                      onChange={setLoginData}
                      placeholder="enter password"
                      value={loginCredentials.password}
                    />
                  </div>
                </div>

                <div>
                  {errors.error.password && (
                    <p className="text-center text-danger">
                      {errors.error.password}
                    </p>
                  )}
                </div>
              </div>
              {error && <p className=" text-center text-danger">{error}</p>}
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
              <Link to="/reset">Forgot your password?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
