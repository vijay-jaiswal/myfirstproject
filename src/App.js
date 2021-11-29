import "./App.css";
import Signup from "./Signup";
import Login from "./Login";
import React, { createContext, useState, useEffect } from "react";

import Profile from "./Profile";

import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import EditProfile from "./EditProfile";
const authenticate = createContext();
function App() {
  const [isLogin, setIsLogin] = useState(false);
  const handleIsLogin = () => {
    setIsLogin(!isLogin);
  };
  const [access, setAccess] = useState(false);
  useEffect(() => {
    // setIsLogin(localStorage.setItem('isLogin',isLogin));
    setAccess(JSON.parse(localStorage.getItem("access")));
  }, [isLogin]);

  const authenticateData = [isLogin, handleIsLogin];
  return (
    <>
      <authenticate.Provider value={authenticateData}>
        <div className="container-fluid">
          <Routes>
            { <Route path="/" exact element={<Login />} />}
            {! access && <Route path="/signup" exact element={<Signup />} /> }
            {access && (
              <Route path="/home/profile" exact element={<Profile />} />
            )}

            {access && <Route path="/home" exact element={<Home />} />}
            {access && <Route path="/home/profile/edit" exact element={<EditProfile />} />}

            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </authenticate.Provider>
    </>
  );
}

export default App;
export { authenticate };
