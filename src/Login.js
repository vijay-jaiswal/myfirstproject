import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authenticate } from "./App";
function Login(props) {
  const [isLogin, handleIsLogin] = useContext(authenticate);

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

    const same = localData.filter((d) => d.email === user || d.phone === user);

    if (same.length !== 0) {
      if (same[0].Password === password) {
        console.log("success");
       handleIsLogin();
        localStorage.setItem("access", true);
        localStorage.setItem("userLogin", user);
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
            type="text"
            value={password}
            placeholder="enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button onClick={handleLogin}>login</button>
        </div>
        <p>please signup if you are not existing user </p>
        <Link to="/signup">SIGNUP</Link>
      </div>
    </div>
  );
}

export default Login;
