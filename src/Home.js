import React from "react";
import { useState, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import "./Home.css";
import { authenticate } from "./App";
import moment from "moment";
import Header from "./Header";
import Profile from "./Profile";
import swal from "sweetalert";

const logoutContext = createContext();

function Home(props) {
  const [isLogin, handleIsLogin] = useContext(authenticate);
  const location = useLocation();
  const [todos, setTodos] = useState({
    todo: "",
    dateTime: "",
  });

  // var auth = JSON.parse(localStorage.getItem("auth"));
  // const handleSignup = () => {
  //   if (auth === null) {
  //     auth = [];
  //   }
  //   if (signUpData.password1 === signUpData.password2) {
  //     auth = [
  //       ...auth,
  //       {
  //         fname: signUpData.firstName,
  //         lname: signUpData.lastName,
  //         phone: signUpData.phoneNumber,
  //         email: signUpData.email,
  //         gender: signUpData.gender,
  //         Password: signUpData.password1,
  //       },
  //     ];
  //     localStorage.setItem("auth", JSON.stringify(auth));
  //     navigate("/");
  //   } else {
  //     const d = "Passwords are not matching";
  //     setError5(d);
  //   }

  //   setSignUpData({
  //     firstName: "",
  //     lastName: "",
  //     phoneNumber: "",
  //     email: "",
  //     gender: "",
  //     password1: "",
  //     password2: "",
  //   });
  // };

  const [todoList, setTodoList] = useState([]);
  let navigate = useNavigate();

  let userData = JSON.parse(localStorage.getItem("userDetail"));

  function checkTask() {
    if (todos.todo === "") {
      return " please add task\n";
    } else {
      return "";
    }
  }

  function checkDate() {
    if (todos.dateTime === "") {
      return " please select date\n";
    } else {
      return "";
    }
  }

  function validation() {
    var val = "";
    val = checkTask();
    val += checkDate();

    if (val === "") {
      console.log(todos);
      setTodoList([...todoList, todos]);
      console.log(todoList);
    } else {
      alert(val);
      return false;
    }
    setTodos({
      todo: "",
      dateTime: "",
    });
  }
  function deleteTodo(id) {
    setTodoList(todoList.filter((el, index) => index !== id));
  }

  function handleProfile(e) {
    e.preventDefault();
    navigate("/profile");
  }
  function handleLogout(e) {
    e.preventDefault();

    localStorage.removeItem("userLogin");
    localStorage.removeItem("access");
    localStorage.removeItem("userDetail");

    // alert("successfully logout");
    swal("successfully logout!", "You clicked at logout!", "success");

    navigate("/");
  }

  const handleTodo = (e) => {
    setTodos({ ...todos, [e.target.name]: e.target.value });
  };

  function addTodo(e) {
    e.preventDefault();

    validation();
  }

  return (
    <>
      <logoutContext.Provider value={handleLogout}>
        {(Profile)}
      </logoutContext.Provider>

      <Header logout={handleLogout} profile={handleProfile} />

      <h1 className="welcome">Hello {userData.fname} </h1>
      <div className="log-out d-flex justify-content-between"></div>

      <div id="myDIV" className="header">
        <h2>My To Do List</h2>
        <input
          name="todo"
          type="text"
          id="myInput"
          required="true"
          onChange={handleTodo}
          value={todos.todo}
          placeholder="add task"
        />
        <input
          name="dateTime"
          type="dateTime-local"
          id="myDate"
          onChange={handleTodo}
          value={todos.dateTime}
        />
        <button onClick={addTodo} className="addBtn">
          Add
        </button>
        {}
        <div className="mt-4 bg-warning">
          <table class="table">
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Todo List</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {todoList &&
                todoList.map((todos, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{todos.todo}</td>
                      <td>
                        {moment(todos.dateTime).format(
                          "DD-MMMM-YYYY |hh:mm:ss a"
                        )}
                      </td>
                      <td>
                        <span id="span1" onClick={() => deleteTodo(index)}>
                          X
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default Home;
export { logoutContext };
