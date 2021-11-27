import React from "react";
import "./App.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {} from "react-router";
function Signup(props) {

  const [signUpData, setSignUpData] = useState({
    firstName:'',
    lastName:'',
    phoneNumber:'',
    email:'',
    gender:'',
    password1:'',
    password2:''
  })


  const handleSignUp=(e)=>{
     setSignUpData({...signUpData,[e.target.name]:e.target.value});
  }

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

  function validation() {
    var val = "";
    val = checkFName();
    val += checkLName();
    val += checkPhone();
    val += checkEmail();
    val += checkGender();
    val += checkPassword();
    console.log(signUpData);
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
      alert("Passwords are not matching");
    }

      setSignUpData({
        firstName:'',
        lastName:'',
        phoneNumber:'',
        email:'',
        gender:'',
        password1:'',
        password2:''
      })
  };

  return (
        <div className="row">
        <h1 className="register"> Please Register first to login</h1>

      <div className="signUp_Form">
        <div className="SignUp">
          First Name:
          <input
            name="firstName"
            type="text"
            value={signUpData.firstName}
            onChange={handleSignUp}
            placeholder="firstName"
          />
          <br />
          Last Name:
          <input
          name="lastName"
            type="text"
            value={signUpData.lastName}
            onChange={handleSignUp}
            placeholder="lastName"
          />
          <br />
          Contact Number:
          <input
          name="phoneNumber"
            type="number"
            value={signUpData.phoneNumber}
            onChange={handleSignUp}
            placeholder="phoneNumber"
          />
          <br />
          Email Id:
          <input
          name="email"
            type="email"
            value={signUpData.email}
            onChange={handleSignUp}
            placeholder="email"
          />
          <br />
          <div onChange={handleSignUp} value={signUpData.gender}>
            Gender: <input type="radio" value="Male" name="gender" /> Male
            <input type="radio" value="Female" name="gender" /> Female
            <input type="radio" value="Other" name="gender" /> Other
          </div>
          <br />
          Password :
          <input
          name="password1"
            type="password"
            value={signUpData.password1}
            placeholder="Password"
            onChange={handleSignUp}
          />
          <br />
          Confirm Password:
          <input
           name="password2"
            type="password"
            value={signUpData.password2}
            placeholder="ConfirmPassword"
            onChange={handleSignUp}
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
