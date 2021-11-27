import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authenticate } from "./App";
function Login(props) {
  const [isLogin, handleIsLogin] = useContext(authenticate);

  // const user = {
  //   userNme: '',
  //   password: ''
  // }
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [localData, setLocalData] = useState("");
  // const [isLogin, setIsLogin] = useState("false");

  let navigate = useNavigate();
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("auth"));
    if (data && data.length > 0) {
      setLocalData(data);
    } else {
      setLocalData([]);
    }
  }, []);

  function handleLogin(e) {
  

    e.preventDefault();
    const userDetail = [];
    const same = localData.filter((d) => {
      if (d.email === user || d.phone === user) {
        userDetail.push(d);
        return true;
      }
    });

    if (same.length !== 0) {
      if (same[0].Password === password) {
        console.log("success");
        handleIsLogin();
        localStorage.setItem("access", true);
        localStorage.setItem("userLogin", user);
        localStorage.setItem("userDetail", JSON.stringify(userDetail));

        setUser("");
        setPassword("");
        setTimeout(() => {
          navigate("home");
        }, 500);
      } else {
        alert("wrong password.");
      }
    } else {
      alert(`${user} user not exist!`);
    }
  }
  return (
    <div className="row">
      <h1 className="loginpage">welcome back,please login</h1>
      <div className="login_form">
        <div className="login">
          <label>User id:</label>
          <br />
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="enter email or phone no."
          />
          <br />
          <label>Password:</label>
          <br />
          <input
            type="password"
            value={password}
            placeholder="enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="btn1" onClick={handleLogin}>login</button>
        </div>
        <p>please signup if you are not existing user </p>
        <Link to="/signup">SIGNUP</Link>
      </div>
    </div>
  );
}

export default Login;
