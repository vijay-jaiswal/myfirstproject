import React from "react";
import "./App.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {} from "react-router";
function Signup(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  let navigate = useNavigate();
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  function checkFName() {
    var pp = /^[a-zA-Z]*$/;
    if (firstName === "") {
      return " please write your first name\n";
    } else if (!pp.test(firstName)) {
      return "only alphabet\n";
    } else {
      return "";
    }
  }
  function checkLName() {
    var pp = /^[a-zA-Z]*$/;
    if (lastName === "") {
      return " please write your last name\n";
    } else if (!pp.test(lastName)) {
      return "only alphabet\n";
    } else {
      return "";
    }
  }

  function checkPhone() {
    var pp = /^\d{10}$/;
    if (phoneNumber === "") {
      return " please write your contact number\n";
    } else if (!pp.test(phoneNumber)) {
      return " phone no. should be 10 digit \n";
    } else {
      return "";
    }
  }

  function checkEmail() {
    var pp = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if (email === "") {
      return " please write your email id\n";
    } else if (!pp.test(email)) {
      return " email is not valid \n";
    } else {
      return "";
    }
  }

  function checkGender() {
    if (gender === "") {
      return " please select gender\n";
    } else {
      return "";
    }
  }

  function checkPassword() {
    var pp =
      /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    if (password1 === "") {
      return " please write password\n";
    } else if (!pp.test(password1)) {
      return " password invalid should contain 8 digits and special character";
    } else {
      return "";
    }
  }

  function validation() {
    var val = "";
    val = checkFName();
    val += checkLName();
    val += checkPhone();
    val += checkEmail();
    val += checkGender();
    val += checkPassword();
    if (val === "") {
      handleSignup();
    } else {
      alert(val);
      return false;
    }
  }

  var auth = JSON.parse(localStorage.getItem("auth"));
  const handleSignup = () => {
    if (auth === null) {
      auth = [];
    }
    if (password1 === password2) {
      auth = [
        ...auth,
        {
          fname: firstName,
          lname: lastName,
          phone: phoneNumber,
          email: email,
          gender: gender,
          Password: password1,
        },
      ];
      localStorage.setItem("auth", JSON.stringify(auth));
      navigate("/");
    } else {
      alert("Passwords are not matching");
    }

    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setGender("");
    setPassword1("");
    setPassword2("");
    setEmail("");
  };

  return (
        <div className="row">
        <h1 className="register"> Please Register first to login</h1>

      <div className="signUp_Form">
        <div className="SignUp">
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="firstName"
          />
          <br />
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="lastName"
          />
          <br />
          Contact Number:
          <input
            type="number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="phoneNumber"
          />
          <br />
          Email Id:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
          <br />
          <div onChange={(e) => setGender(e.target.value)}>
            Gender: <input type="radio" value="Male" name="gender" /> Male
            <input type="radio" value="Female" name="gender" /> Female
            <input type="radio" value="Other" name="gender" /> Other
          </div>
          <br />
          Password :
          <input
            type="password"
            value={password1}
            placeholder="Password"
            onChange={(e) => setPassword1(e.target.value)}
          />
          <br />
          Confirm Password:
          <input
            type="password"
            value={password2}
            placeholder="ConfirmPassword"
            onChange={(e) => setPassword2(e.target.value)}
          />
          <br />
          <button className="btn1" onClick={validation}>signup</button>
          <br />
        </div>

        <p>already signup,click to login </p>
        <Link to="/">LOGIN</Link>
      </div>
    </div>
  );
}

export default Signup;
