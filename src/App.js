import "./App.css";
import Signup from "./Components/login/Signup";
import Login from "./Components/login/Login";
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import EditProfile from "./Components/EditProfile";
import { auth } from "./Components/firebase-config";
import ResetPassword from "./Components/login/ResetPassword";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);

  //....................CHECKING IS USER LOGGEDIN OR NOT.................................
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else setUser(null);
    });
  }, []);

  return (
    <>
      <div className="container-fluid">
        <Routes>
          {user && <Route path="/" exact element={<Home />} />}
          {!user && <Route path="/" exact element={<Login />} />}
          {!user && <Route path="/reset" exact element={<ResetPassword />} />}
          {!user && <Route path="/signup" exact element={<Signup />} />}
          {user && <Route path="/home" exact element={<Home />} />}
          {user && <Route path="/edit" exact element={<EditProfile />} />}
          {!user && <Route path="*" exact element={<Login />} />}
          {user && <Route path="*" exact element={<Home />} />}
        </Routes>
      </div>
    </>
  );
}

export default App;
