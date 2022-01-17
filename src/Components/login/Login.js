import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { db, auth } from "../firebase-config";
import { collection, setDoc, doc } from "firebase/firestore";
import Input from "../Input";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [loginCredentials, setLoginCredentials] = useState({
    fields: {
      user: "",
      password: "",
    },
    errors: {},
  });

  const [error, setError] = useState("");
  let navigate = useNavigate();
  const accessFirebase = collection(db, "access");

  const setLoginData = (e) => {
    loginCredentials.fields[e.target.name] = e.target.value;
    setLoginCredentials({ ...loginCredentials });

    if (loginCredentials.errors[e.target.name]) {
      loginCredentials.errors[e.target.name] = "";
    }
    validate(e.target.name);
  };
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

  const handleLogin = async (e) => {
    if (validate("all")) {
      e.preventDefault();

      try {
        const user = await signInWithEmailAndPassword(
          auth,
          loginCredentials.fields.user,
          loginCredentials.fields.password
        );
        console.log("succesfully login");
        await setDoc(doc(accessFirebase, user.user.uid), {
          access: true,
        });
        setTimeout(() => {
          navigate("home");
        }, 500);
      } catch (error) {
        setError(error.message);
      }
   
    }
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
