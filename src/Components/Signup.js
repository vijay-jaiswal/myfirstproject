import React from "react";
import "../App.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";
import "../CSS/Signup.css";

function Signup(props) {
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    gender: "",
    password1: "",
    password2: "",
  });

  const handleSignUp = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  let navigate = useNavigate();
  function checkFName() {
    var pp = /^[a-zA-Z]*$/;
    if (signUpData.firstName === "") {
      return " please write your first name\n";
    } else if (!pp.test(signUpData.firstName)) {
      return "only alphabet\n";
    } else {
      return "";
    }
  }
  function checkLName() {
    var pp = /^[a-zA-Z]*$/;
    if (signUpData.lastName === "") {
      return " please write your last name\n";
    } else if (!pp.test(signUpData.lastName)) {
      return "only alphabet\n";
    } else {
      return "";
    }
  }

  function checkPhone() {
    var pp = /^\d{10}$/;
    if (signUpData.phoneNumber === "") {
      return " please write your contact number\n";
    } else if (!pp.test(signUpData.phoneNumber)) {
      return " phone no. should be 10 digit \n";
    } else {
      return "";
    }
  }

  function checkEmail() {
    var pp = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if (signUpData.email === "") {
      return " please write your email id\n";
    } else if (!pp.test(signUpData.email)) {
      return " email is not valid \n";
    } else {
      return "";
    }
  }

  function checkGender() {
    if (signUpData.gender === "") {
      return " please select gender\n";
    } else {
      return "";
    }
  }

  function checkPassword() {
    var pp =
      /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    if (signUpData.password1 === "") {
      return " please write password\n";
    } else if (!pp.test(signUpData.password1)) {
      return " password invalid should contain 8 digits and special character";
    } else {
      return "";
    }
  }
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");
  const [error4, setError4] = useState("");
  const [error5, setError5] = useState("");

  function validation() {
    var val = "";
    var val1 = "";

    var val2 = "";

    var val3 = "";
    var val4 = "";
    var val5 = "";

    val = checkFName();
    val1 = checkLName();
    val2 = checkPhone();
    val3 = checkEmail();
    val4 = checkGender();
    val5 = checkPassword();
    console.log(signUpData);
    if (
      val === "" &&
      val1 === "" &&
      val2 === "" &&
      val3 === "" &&
      val4 === "" &&
      val5 === ""
    ) {
      handleSign();
    } else {
      setError(val);
      setError1(val1);
      setError2(val2);
      setError3(val3);
      setError4(val4);
      setError5(val5);

      return false;
    }
  }

  var auth = JSON.parse(localStorage.getItem("auth"));
  const handleSign = () => {
    if (auth === null) {
      auth = [];
    }
    if (signUpData.password1 === signUpData.password2) {
      auth = [
        ...auth,
        {
          fname: signUpData.firstName,
          lname: signUpData.lastName,
          phone: signUpData.phoneNumber,
          email: signUpData.email,
          gender: signUpData.gender,
          Password: signUpData.password1,
        },
      ];
      localStorage.setItem("auth", JSON.stringify(auth));
      navigate("/");
    } else {
      const d = "Passwords are not matching";
      setError5(d);
    }

    setSignUpData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      gender: "",
      password1: "",
      password2: "",
    });
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
                <p className=" text-danger">{error}</p>
              </div>
              <div className="col-xs-6 col-md-6">
                <Input
                  name={"lastName"}
                  type={"text"}
                  onChange={handleSignUp}
                  placeholder={"Last Name"}
                  value={signUpData.lastName}
                />
                <p className=" text-danger">{error1}</p>
              </div>
            </div>
            <Input
              name={"phoneNumber"}
              type={"number"}
              onChange={handleSignUp}
              placeholder={"Phone Number"}
              value={signUpData.phoneNumber}
            />

            <p className=" text-danger">{error2}</p>

            <Input
              name={"email"}
              type={"email"}
              onChange={handleSignUp}
              placeholder={"Email"}
              value={signUpData.email}
            />
            <p className=" text-danger">{error3}</p>
            <Input
              name={"password1"}
              type={"Password"}
              onChange={handleSignUp}
              placeholder={"Password"}
              value={signUpData.password1}
            />

            <p className=" text-danger">{error5}</p>

            <Input
              name={"password2"}
              type={"Password"}
              onChange={handleSignUp}
              placeholder={"Confirm Password"}
              value={signUpData.password2}
            />

            <div onChange={handleSignUp} value={signUpData.gender}>
              Gender: <input type="radio" value="Male" name="gender" /> Male
              <input type="radio" value="Female" name="gender" /> Female
              <input type="radio" value="Other" name="gender" /> Other
            </div>
            <p className=" text-danger">{error4}</p>

            <br />
            <span className="help-block">
              By clicking Create my account, you agree to our Terms and that you
              have read our Data Use Policy, including our Cookie Use.
            </span>

            <button
              className="btn btn-lg btn-primary btn-block signup-btn"
              type="submit"
              onClick={validation}
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
