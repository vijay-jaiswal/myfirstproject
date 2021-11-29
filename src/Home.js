import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import "./Home.css";
import { authenticate } from "./App";
import moment from 'moment';

function Home() {
  const [isLogin, handleIsLogin] = useContext(authenticate);
  const location = useLocation();
  const [todos, setTodos] = useState({
    todo:'',
    dateTime:''
  })
  const [todoList, setTodoList] = useState([])
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
    setTodoList([...todoList,todos])
    console.log(todoList);
      

    
    } else {
      alert(val);
      return false;
    }
    setTodos({
      todo:'',
      dateTime:''
    
    })

  }
  function deleteTodo(id) {
    setTodoList(todoList.filter((el,index)=>index!==id));
  }

  function handleProfile(e) {
    e.preventDefault();
    navigate("profile");

  }
  function handleLogout(e) {
    e.preventDefault();

    localStorage.removeItem("userLogin");
    localStorage.removeItem("access");
    localStorage.removeItem("userDetail");

    alert("successfully logout");
    navigate("/");
  }


  const handleTodo=(e)=>{
    setTodos({...todos,[e.target.name]:e.target.value});
  }

  function addTodo() {
    validation();
  }

  return (
    <>
      <h1 className="welcome">Hello {userData.fname} </h1>
      <div className="log-out d-flex justify-content-between">
        <div></div>
        <div><button onClick={handleLogout}>LOGOUT</button></div>
      </div>

      <div className="profile">
        <button className="icon" onClick={handleProfile}>
          PROFILE
        </button>
      </div>

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
                <th scope="col">Sr. No</th>
                <th scope="col">Todo List</th>
                <th scope="col">Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {todoList &&
                todoList.map((todos, index) => {
                  return (
                    <tr>
                      <td scope="row">{index+1}</td>
                      <td>{todos.todo}</td>
                      <td>{moment(todos.dateTime).format( 'DD-MMMM-YYYY |hh:mm:ss a')}</td>
                      <td><span id="span1" onClick={() => deleteTodo(index)}>
                    X
                  </span></td>
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
