import "./App.css";
import Signup from "./Components/login/Signup";
import Login from "./Components/login/Login";
import React, { useState, useEffect, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import EditProfile from "./Components/EditProfile";
import ResetPassword from "./Components/login/ResetPassword";
import PageNotFound from "./Components/PageNotFound";
import Header from "./Components/Header";
import TodoList from "./Components/TodoList";
const authenticate = createContext();

function App() {
  const [access, setAccess] = useState(false);
  const handleIsLogin = () => {
    setAccess(!access);
  };

  useEffect(() => {
    setAccess(JSON.parse(localStorage.getItem("access")));
  }, [access]);

  return (
    <>
      <authenticate.Provider value={[handleIsLogin]}>
        {access && <Header />}

        <div className="container-fluid">
          <Routes>
            {access && (
              <>
                <Route path="/" exact element={<TodoList />} />
                <Route path="/todolist" exact element={<TodoList />} />
                <Route path="/edit" exact element={<EditProfile />} />
              </>
            )}
            {!access && (
              <>
                <Route path="/" exact element={<Login />} />
                <Route path="/reset" exact element={<ResetPassword />} />
                <Route path="/signup" exact element={<Signup />} />
              </>
            )}
            <Route path="*" exact element={<PageNotFound />} />
          </Routes>
        </div>
      </authenticate.Provider>
    </>
  );
}

export default App;
export { authenticate };
