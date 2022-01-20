import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../Input";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./Signup.css";
import { db, auth } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [signUpData, setSignUpData] = useState({
    fields: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      gender: "",
      password1: "",
      password2: "",
    },
    errors: {},
  });
  const [error, setError] = useState("");
  let navigate = useNavigate();

  //....................ONCHANGE EVENT..........................
  const handleSignUp = (e) => {
    signUpData.fields[e.target.name] = e.target.value;
    setSignUpData({ ...signUpData });
    if (signUpData.errors[e.target.name]) {
      signUpData.errors[e.target.name] = "";
    }
    validate(e.target.name);
  };

  //...................ONCLICK EVENT(SIGNUP)..........................
  const handleSign = async (e) => {
    e.preventDefault();
    if (validate("all")) {
      if (signUpData.fields.password1 === signUpData.fields.password2) {
        try {
          const user = await createUserWithEmailAndPassword(
            auth,
            signUpData.fields.email,
            signUpData.fields.password1
          );
          console.log(user.user.uid);
        await  addDoc(collection(db, "users", user.user.uid, "userDetail"), {
            firstName: signUpData.fields.firstName,
            lastName: signUpData.fields.lastName,
            phoneNumber: signUpData.fields.phoneNumber,
            email: user.user.email,
            gender: signUpData.fields.gender,
            uid: user.user.uid,
          });
          await signOut(auth);
          navigate("/");
        } catch (error) {
          setError(error.message);
        }
      } else {
        setError("password not matching");
      }
    }
  };

  //..........................VALIADATION.................................
  const validate = (type) => {
    let fields = signUpData.fields;
    let errors = {};
    let formIsValid = true;
    switch (type) {
      case "firstName":
        if (!fields["firstName"]) {
          formIsValid = false;
          errors["firstName"] = "*Please enter your firstName.";
        }
        if (typeof fields["firstName"] !== "undefined") {
          if (!fields["firstName"].match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            errors["firstName"] = "*Please enter alphabet characters only.";
          }
        }
        break;
      case "lastName":
        if (!fields["lastName"]) {
          formIsValid = false;
          errors["lastName"] = "*Please enter your lastName.";
        }
        if (typeof fields["lastName"] !== "undefined") {
          if (!fields["lastName"].match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            errors["lastName"] = "*Please enter alphabet characters only.";
          }
        }
        break;
      case "phoneNumber":
        if (typeof fields["phoneNumber"] !== "undefined") {
          if (!fields["phoneNumber"].match(/^\d{10}$/)) {
            formIsValid = false;
            errors["phoneNumber"] = "*Please enter valid phoneNumber ";
          }
        }
        if (!fields["phoneNumber"]) {
          formIsValid = false;
          errors["phoneNumber"] = "*Please enter your phoneNumber ";
        }
        break;
      case "email":
        if (typeof fields["email"] !== "undefined") {
          if (!fields["email"].match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
            formIsValid = false;
            errors["email"] = "*Please enter valid email-ID.";
          }
        }
        if (!fields["email"]) {
          formIsValid = false;
          errors["email"] = "*Please enter your email-ID.";
        }
        break;
      case "password1":
        if (typeof fields["password1"] !== "undefined") {
          if (
            !fields["password1"].match(
              /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
            )
          ) {
            formIsValid = false;
            errors["password1"] = "*Please enter valid password.";
          }
        }
        if (!fields["password1"]) {
          formIsValid = false;
          errors["password1"] = "*Please enter your password";
        }
        break;
      case "password2":
        if (typeof fields["password1"] !== "undefined") {
          if (!fields["password2"].match(fields["password1"])) {
            formIsValid = false;
            errors["password2"] = "*password not matching";
          }
        }
        if (!fields["password2"]) {
          formIsValid = false;
          errors["password2"] = "*Please enter your password";
        }
        break;
      case "gender":
        if (!fields["gender"]) {
          formIsValid = false;
          errors["gender"] = "*Please choose your gender.";
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
    signUpData.errors = errors;
    setSignUpData({ ...signUpData });
    return formIsValid;
  };

  return (
    <>
      <br></br>
      <div className="container" id="wrap">
        <div className="row  justify-content-center">
          <div className="col-md-6 col-md-offset-3 justify-content-center">
            <legend>Sign Up</legend>
            <h4>It's free and always will be.</h4>
            <div className="row">
              <div className="col-xs-6 col-md-6">
                <Input
                  name="firstName"
                  type="text"
                  onChange={handleSignUp}
                  placeholder="First Name"
                  value={signUpData.fields.firstName}
                />

                {signUpData.errors.firstName && (
                  <p className=" text-danger">{signUpData.errors.firstName}</p>
                )}
              </div>
              <div className="col-xs-6 col-md-6">
                <Input
                  name="lastName"
                  type="text"
                  onChange={handleSignUp}
                  placeholder="Last Name"
                  value={signUpData.fields.lastName}
                />

                {signUpData.errors.lastName && (
                  <p className=" text-danger">{signUpData.errors.lastName}</p>
                )}
              </div>
            </div>

            <Input
              name="phoneNumber"
              type="number"
              onChange={handleSignUp}
              placeholder="Phone Number"
              value={signUpData.fields.phoneNumber}
            />

            {signUpData.errors.phoneNumber && (
              <p className=" text-danger">{signUpData.errors.phoneNumber}</p>
            )}

            <Input
              name="email"
              type="email"
              onChange={handleSignUp}
              placeholder="Email"
              value={signUpData.fields.email}
            />

            {signUpData.errors.email && (
              <p className=" text-danger">{signUpData.errors.email}</p>
            )}

            <Input
              name="password1"
              type="Password"
              onChange={handleSignUp}
              placeholder="Password"
              value={signUpData.fields.password1}
            />

            {signUpData.errors.password1 && (
              <p className=" text-danger">{signUpData.errors.password1}</p>
            )}

            <Input
              name="password2"
              type="Password"
              onChange={handleSignUp}
              placeholder="Confirm Password"
              value={signUpData.fields.password2}
            />

            {signUpData.errors.password2 && (
              <p className=" text-danger">{signUpData.errors.password2}</p>
            )}

            <div onChange={handleSignUp} value={signUpData.fields.gender}>
              Gender: <input type="radio" value="Male" name="gender" /> Male
              <input type="radio" value="Female" name="gender" /> Female
              <input type="radio" value="Other" name="gender" /> Other
            </div>

            {signUpData.errors.gender && (
              <p className=" text-danger">{signUpData.errors.gender}</p>
            )}
            <p className=" text-danger">{error}</p>

            <br />
            <span className="help-block">
              By clicking Create my account, you agree to our Terms and that you
              have read our Data Use Policy, including our Cookie Use.
            </span>
            <div className="d-flex justify-content-center mt-3 login_container">
              <button
                className="  btn-block signup-btn center "
                type="button"
                onClick={handleSign}
              >
                Create my account
              </button>
            </div>
            <div className="redirectToLogin">
              <p>already signup,click to login </p>
              <Link to="/">LOGIN</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
