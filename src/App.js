import "./App.css";
import Signup from "./Components/login/Signup";
import Login from "./Components/login/Login";
import React, { createContext, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import EditProfile from "./Components/EditProfile";
import { db } from "./Components/firebase-config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const authenticate = createContext();
function App() {
  const [isLogin, setIsLogin] = useState(false);
  const handleIsLogin = () => {
    setIsLogin(!isLogin);
  };
  const [access, setAccess] = useState(false);
  const accessFirebase = collection(db, "access");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getlist = async () => {
      const data = await getDocs(accessFirebase);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    
    getlist();
  },);


  useEffect(() => {
    // setAccess(JSON.parse(localStorage.getItem("access")));
    if (users && users.length > 0) {
    users.map((d)=>{
      setAccess(d.access);
    }
    )}
    else{
      setAccess(false);
    }
  },);

  const authenticateData = [isLogin, handleIsLogin];
  return (
    <>
      <authenticate.Provider value={authenticateData}>
        <div className="container-fluid">
          <Routes>
            {access && <Route path="/" exact element={<Home />} />}

            {!access && <Route path="/" exact element={<Login />} />}
            {!access && <Route path="/signup" exact element={<Signup />} />}

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
