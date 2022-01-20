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
  const [loginCredentials, setLoginCredentials] = useState({
    fields: {
      user: "",
      password: "",
    },
    errors: {},
  });
  const [error, setError] = useState("");
  let navigate = useNavigate();

  //.............................ONCHANGE EVENT................................
  const setLoginData = (e) => {
    loginCredentials.fields[e.target.name] = e.target.value;
    setLoginCredentials({ ...loginCredentials });

    if (loginCredentials.errors[e.target.name]) {
      loginCredentials.errors[e.target.name] = "";
    }
    validate(e.target.name);
  };

  //...........................VALIDATION..............................
  const validate = (type) => {
    let fields = loginCredentials.fields;
    let errors = {};
    let formIsValid = true;
    switch (type) {
      case "user":
        if (!fields["user"]) {
          formIsValid = false;
          errors["user"] = "*please enter user detail.";
        }
        break;

      case "password":
        if (!fields["password"]) {
          formIsValid = false;
          errors["password"] = "*please enter password.";
        }
        break;
      case "all":
        Object.keys(fields).forEach((key) => {
          if (fields[key].trim() === "") {
            formIsValid = false;
            errors[key] = "please enter value";
          }
        });
        break;
      default:
        break;
    }
    loginCredentials.errors = errors;
    setLoginCredentials({ ...loginCredentials });
    return formIsValid;
  };

  // .........................ONCLICK EVENT(LOGIN).......................................
  const handleLogin = async (e) => {
    e.preventDefault();

    if (validate("all")) {
      try {
        const user = await signInWithEmailAndPassword(
          auth,
          loginCredentials.fields.user,
          loginCredentials.fields.password
        );
        localStorage.setItem("access", true);
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
                      value={loginCredentials.fields.user}
                    />
                  </div>
                </div>

                <div>
                  {loginCredentials.errors.user && (
                    <p className="text-center text-danger">
                      {loginCredentials.errors.user}
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
                      value={loginCredentials.fields.password}
                    />
                  </div>
                </div>

                <div>
                  {loginCredentials.errors.password && (
                    <p className="text-center text-danger">
                      {loginCredentials.errors.password}
                    </p>
                  )}
                </div>
              </div>
              <p className=" text-center text-danger">{error}</p>
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