import "./App.css";
import Signup from "./Components/login/Signup";
import Login from "./Components/login/Login";
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import EditProfile from "./Components/EditProfile";
import { db } from "./Components/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import TodoList from "./Components/TodoList";
import ResetPassword from "./Components/login/ResetPassword";

function App() {
  const [access, setAccess] = useState(false);
  const accessFirebase = collection(db, "access");
  const [accessList, setAccessList] = useState([]);
  useEffect(() => {
    const getlist = async () => {
      const data = await getDocs(accessFirebase);
      setAccessList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getlist();
  }, [accessFirebase]);
  useEffect(() => {
    if (accessList && accessList.length > 0) {
      accessList.forEach((elm) => {
        setAccess(elm.access);
      });
    } else {
      setAccess(false);
    }
  }, [accessList]);

  return (
    <>
      <div className="container-fluid">
        <Routes>
          {access && <Route path="/" exact element={<Home />} />}
          {!access && <Route path="/" exact element={<Login />} />}
          {!access && <Route path="/reset" exact element={<ResetPassword />} />}

          {!access && <Route path="/signup" exact element={<Signup />} />}
          {access && <Route path="/home" exact element={<Home />} />}
          {access && <Route path="/edit" exact element={<EditProfile />} />}
          {!access && <Route path="*" element={<Login />} />}
          {access && <Route path="*" element={<Home />} />}
          {access && <Route path="/todo" element={<TodoList />} />}
        </Routes>
      </div>
    </>
  );
}

export default App;
