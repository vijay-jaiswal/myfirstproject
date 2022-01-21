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
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    gender: "",
    password1: "",
    password2: "",
  });
  const [errors, setErrors] = useState({
    error: {},
  });
  const [error, setError] = useState("");
  let navigate = useNavigate();

  //....................ONCHANGE EVENT..........................
  const handleSignUp = (e) => {
    signUpData[e.target.name] = e.target.value;
    setSignUpData({ ...signUpData });
    if (errors.error[e.target.name]) {
      errors.error[e.target.name] = "";
    }
    validate(e.target.name);
  };

  //...................ONCLICK EVENT(SIGNUP)..........................
  const handleSign = async (e) => {
    e.preventDefault();
    if (
      validate("firstName") &&
      validate("lastName") &&
      validate("phoneNumber") &&
      validate("email") &&
      validate("password1") &&
      validate("password2") &&
      validate("gender")
    ) {
      if (signUpData.password1 === signUpData.password2) {
        try {
          const user = await createUserWithEmailAndPassword(
            auth,
            signUpData.email,
            signUpData.password1
          );
          console.log(user.user.uid);
          await addDoc(collection(db, "users", user.user.uid, "userDetail"), {
            firstName: signUpData.firstName,
            lastName: signUpData.lastName,
            phoneNumber: signUpData.phoneNumber,
            email: user.user.email,
            gender: signUpData.gender,
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
    let errors = {};
    let formIsValid = true;
    switch (type) {
      case "firstName":
        if (!signUpData["firstName"]) {
          formIsValid = false;
          errors["firstName"] = "*Please enter your firstName.";
        }
        if (signUpData["firstName"]) {
          if (!(signUpData["firstName"].length > 2)) {
            formIsValid = false;
            errors["firstName"] = "*FirstName must be atleast 3 character";
          }
        }
        if (typeof signUpData["firstName"] !== "undefined") {
          if (!signUpData["firstName"].match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            errors["firstName"] =
              "*FirstName must be  alphabet characters only.";
          }
        }
        break;
      case "lastName":
        if (!signUpData["lastName"]) {
          formIsValid = false;
          errors["lastName"] = "*Please enter your lastName.";
        }
        if (signUpData["lastName"]) {
          if (!(signUpData["lastName"].length > 2)) {
            formIsValid = false;
            errors["lastName"] = "*lastName must be atleast 3 character";
          }
        }

        if (typeof signUpData["lastName"] !== "undefined") {
          if (!signUpData["lastName"].match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            errors["lastName"] = "*lastName must be  alphabet characters only.";
          }
        }
        break;
      case "phoneNumber":
        if (typeof signUpData["phoneNumber"] !== "undefined") {
          if (!signUpData["phoneNumber"].match(/^\d{10}$/)) {
            formIsValid = false;
            errors["phoneNumber"] = "*phoneNumber must be 10-digit only ";
          }
        }
        if (!signUpData["phoneNumber"]) {
          formIsValid = false;
          errors["phoneNumber"] = "*Please enter your phoneNumber ";
        }
        break;
      case "email":
        if (typeof signUpData["email"] !== "undefined") {
          if (!signUpData["email"].match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
            formIsValid = false;
            errors["email"] =
              "*email must contain one upperCase,lowerCase and special character,ex-aBc@gmail.com";
          }
        }
        if (!signUpData["email"]) {
          formIsValid = false;
          errors["email"] = "*Please enter your email-ID.";
        }
        break;
      case "password1":
        if (typeof signUpData["password1"] !== "undefined") {
          if (
            !signUpData["password1"].match(
              /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
            )
          ) {
            formIsValid = false;
            errors["password1"] = "*Please enter valid password.";
          }
        }
        if (!signUpData["password1"]) {
          formIsValid = false;
          errors["password1"] = "*Please enter your password";
        }
        break;
      case "password2":
        if (typeof signUpData["password1"] !== "undefined") {
          if (!signUpData["password2"].match(signUpData["password1"])) {
            formIsValid = false;
            errors["password2"] = "*password not matching";
          }
        }
        if (!signUpData["password2"]) {
          formIsValid = false;
          errors["password2"] = "*Please enter your password";
        }
        break;
      case "gender":
        if (!signUpData["gender"]) {
          formIsValid = false;
          errors["gender"] = "*Please choose your gender.";
        }
        break;

      default:
        break;
    }
    errors.error = errors;
    setErrors({ ...errors });
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
                  value={signUpData.firstName}
                />

                {errors.error.firstName && (
                  <p className=" text-danger">{errors.error.firstName}</p>
                )}
              </div>
              <div className="col-xs-6 col-md-6">
                <Input
                  name="lastName"
                  type="text"
                  onChange={handleSignUp}
                  placeholder="Last Name"
                  value={signUpData.lastName}
                />

                {errors.error.lastName && (
                  <p className=" text-danger">{errors.error.lastName}</p>
                )}
              </div>
            </div>

            <Input
              name="phoneNumber"
              type="number"
              onChange={handleSignUp}
              placeholder="Phone Number"
              value={signUpData.phoneNumber}
            />

            {errors.error.phoneNumber && (
              <p className=" text-danger">{errors.error.phoneNumber}</p>
            )}

            <Input
              name="email"
              type="email"
              onChange={handleSignUp}
              placeholder="Email"
              value={signUpData.email}
            />

            {errors.error.email && (
              <p className=" text-danger">{errors.error.email}</p>
            )}

            <Input
              name="password1"
              type="Password"
              onChange={handleSignUp}
              placeholder="Password"
              value={signUpData.password1}
            />

            {errors.error.password1 && (
              <p className=" text-danger">{errors.error.password1}</p>
            )}

            <Input
              name="password2"
              type="Password"
              onChange={handleSignUp}
              placeholder="Confirm Password"
              value={signUpData.password2}
            />

            {errors.error.password2 && (
              <p className=" text-danger">{errors.error.password2}</p>
            )}

            <div onChange={handleSignUp} value={signUpData.gender}>
              Gender: <input type="radio" value="Male" name="gender" /> Male
              <input type="radio" value="Female" name="gender" /> Female
              <input type="radio" value="Other" name="gender" /> Other
            </div>

            {errors.error.gender && (
              <p className=" text-danger">{errors.error.gender}</p>
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
