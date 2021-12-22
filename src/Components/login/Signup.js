import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../Input";

import "./Signup.css";
function Signup(props) {
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
  const handleSignUp = (e) => {
    signUpData.fields[e.target.name] = e.target.value;
    setSignUpData({ ...signUpData });

    if (signUpData.errors[e.target.name]) {
      signUpData.errors[e.target.name] = "";
    }
    validate();
  };
  let navigate = useNavigate();

  var auth = JSON.parse(localStorage.getItem("auth"));

  const handleSign = (e) => {
    e.preventDefault();

    if (validate()) {
      if (auth === null) {
        auth = [];
      }

      if (signUpData.fields.password1 === signUpData.fields.password2) {
        auth = [
          ...auth,
          {
            fname: signUpData.fields.firstName,
            lname: signUpData.fields.lastName,
            phone: signUpData.fields.phoneNumber,
            email: signUpData.fields.email,
            gender: signUpData.fields.gender,
            Password: signUpData.fields.password1,
          },
        ];
        localStorage.setItem("auth", JSON.stringify(auth));
        navigate("/");
        setSignUpData({
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
      }
    }
  };
  const validate = () => {
    let fields = signUpData.fields;
    let errors = {};
    let formIsValid = true;
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

    if (typeof fields["email"] !== "undefined") {
      //regular expression for email validation
      if (!fields["email"].match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
        formIsValid = false;
        errors["email"] = "*Please enter valid email-ID.";
      }
    }

    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "*Please enter your email-ID.";
    }

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

    if (typeof fields["password2"] !== "undefined") {
      if (!fields["password2"].match(fields["password1"])) {
        formIsValid = false;
        errors["password2"] = "*password not matching";
      }
    }

    if (!fields["password2"]) {
      formIsValid = false;
      errors["password2"] = "*Please enter your password";
    }

    if (!fields["gender"]) {
      formIsValid = false;
      errors["gender"] = "*Please choose your gender.";
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
                  name={"firstName"}
                  type={"text"}
                  onChange={handleSignUp}
                  placeholder={"First Name"}
                  value={signUpData.firstName}
                />
                {signUpData.errors.firstName && (
                  <p className=" text-danger">{signUpData.errors.firstName}</p>
                )}
              </div>
              <div className="col-xs-6 col-md-6">
                <Input
                  name={"lastName"}
                  type={"text"}
                  onChange={handleSignUp}
                  placeholder={"Last Name"}
                  value={signUpData.lastName}
                />
                {signUpData.errors.lastName && (
                  <p className=" text-danger">{signUpData.errors.lastName}</p>
                )}
              </div>
            </div>
            <Input
              name={"phoneNumber"}
              type={"number"}
              onChange={handleSignUp}
              placeholder={"Phone Number"}
              value={signUpData.phoneNumber}
            />
            {signUpData.errors.phoneNumber && (
              <p className=" text-danger">{signUpData.errors.phoneNumber}</p>
            )}

            <Input
              name={"email"}
              type={"email"}
              onChange={handleSignUp}
              placeholder={"Email"}
              value={signUpData.email}
            />
            {signUpData.errors.email && (
              <p className=" text-danger">{signUpData.errors.email}</p>
            )}

            <Input
              name={"password1"}
              type={"Password"}
              onChange={handleSignUp}
              placeholder={"Password"}
              value={signUpData.password1}
            />

            {signUpData.errors.password1 && (
              <p className=" text-danger">{signUpData.errors.password1}</p>
            )}

            <Input
              name={"password2"}
              type={"Password"}
              onChange={handleSignUp}
              placeholder={"Confirm Password"}
              value={signUpData.password2}
            />
            {signUpData.errors.password2 && (
              <p className=" text-danger">{signUpData.errors.password2}</p>
            )}

            <div onChange={handleSignUp} value={signUpData.gender}>
              Gender: <input type="radio" value="Male" name="gender" /> Male
              <input type="radio" value="Female" name="gender" /> Female
              <input type="radio" value="Other" name="gender" /> Other
            </div>
            {signUpData.errors.gender && (
              <p className=" text-danger">{signUpData.errors.gender}</p>
            )}

            <br />
            <span className="help-block">
              By clicking Create my account, you agree to our Terms and that you
              have read our Data Use Policy, including our Cookie Use.
            </span>

            <button
              className="btn btn-lg btn-primary btn-block signup-btn"
              type="submit"
              onClick={handleSign}
            >
              Create my account
            </button>
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
