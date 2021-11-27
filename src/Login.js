import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authenticate } from "./App";
function Login(props) {
  const [isLogin, handleIsLogin] = useContext(authenticate);
  const [loginCredentials, setLoginCredentials] = useState({
    user:'',
    password:''
  })
  // const [user, setUser] = useState("");
  // const [password, setPassword] = useState("");
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

  const setLoginData=(e)=>{
      setLoginCredentials({...loginCredentials,[e.target.name]:e.target.value});
  }

  function handleLogin(e) {
    e.preventDefault();
    const userDetail = [];
    if(loginCredentials.user.trim()===''){
      alert('please enter userName');
      return false;
    }
    if(loginCredentials.password.trim()===''){
      alert('please enter password');
      return false;
    }
    const matchData = localData.filter((d) => {
      if (d.email === loginCredentials.user || d.phone === loginCredentials.user) {
        userDetail.push(d);
        return true;
      }
    });

    if (matchData.length !== 0) {
      if (matchData[0].Password === loginCredentials.password) {
        console.log("success");
        handleIsLogin();
        localStorage.setItem("access", true);
        // localStorage.setItem("userLogin", loginCredentials.user);
        localStorage.setItem("userDetail", JSON.stringify(userDetail));

        // setUser("");
        // setPassword("");
        setLoginCredentials({
          user:'',
          password:''
        })
        setTimeout(() => {
          navigate("home");
        }, 500);
      } else {
        alert("wrong password.");
      }
    } else {
      alert(`${loginCredentials.user} user not exist!`);
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
            name="user"
            type="text"
            value={loginCredentials.user}
            onChange={setLoginData}
            placeholder="enter email or phone no."
          />
          <br />
          <label>Password:</label>
          <br />
          <input
          name="password"
            type="password"
            value={loginCredentials.password}
            placeholder="enter password"
            onChange={setLoginData}
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
