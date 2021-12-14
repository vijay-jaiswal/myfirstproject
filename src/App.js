import "./App.css";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import React, { createContext, useState, useEffect } from "react";

import Profile from "./Components/Profile";

import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import EditProfile from "./Components/EditProfile";
import PageNotFound from "./Components/PageNotFound";

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
            {access && <Route path="/" exact element={<Home />} />}

            {!access && <Route path="/" exact element={<Login />} />}
            {!access && <Route path="/signup" exact element={<Signup />} />}
            {access && <Route path="/profile" exact element={<Profile />} />}

            {access && <Route path="/home" exact element={<Home />} />}
            {access && <Route path="/edit" exact element={<EditProfile />} />}

            {!access && <Route path="*" element={<Login />} />}
            {access && <Route path="*" element={<Home />} />}
          </Routes>
        </div>
      </authenticate.Provider>
    </>
  );
}

export default App;
export { authenticate };
