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
  // const [inputList, setInputList] = useState("");
  // const [items, setItems] = useState([]);
  // const [inputDate, setInputDate] = useState("");
  const [todos, setTodos] = useState({
    todo:'',
    dateTime:''
  })
  const [todoList, setTodoList] = useState([])
  let navigate = useNavigate();
  // function itemEvent(e) {
  //   setInputList(e.target.value);
  // }

  // function checkTask() {
  //   if (inputList === "") {
  //     return " please add task\n";
  //   } else {
  //     return "";
  //   }
  // }

  // function checkDate() {
  //   if (inputDate === "") {
  //     return " please select date\n";
  //   } else {
  //     return "";
  //   }
  // }

  // function validation() {
  //   var val = "";
  //   val = checkTask();
  //   val += checkDate();

  //   if (val === "") {
  //     setItems((old) => {
  //       return [...old, [inputList, "  ", inputDate]];
  //     });

  //     setInputList("");
  //     setInputDate("");
  //   } else {
  //     alert(val);
  //     return false;
  //   }
  // }

  // function dateEvent(e) {
  //   setInputDate(e.target.value);
  // }

  // function deleteTodo(id) {
  //   console.log("deleted");

  //   setItems((old) => {
  //     return old.filter((arr, index) => {
  //       return index !== id;
  //     });
  //   });
  // }

  function deleteTodo(id) {
    setTodoList(todoList.filter((el,index)=>index!==id));
  }

  function handleProfile(e) {
    e.preventDefault();
    navigate("profile/edit");

    //alert ("showing your profile");
  }
  function handleLogout(e) {
    e.preventDefault();

    //handleIsLogin();
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
    // validation();
    console.log(todos);
    setTodoList([...todoList,todos])
    console.log(todoList);
  }

  return (
    <>
      <h1 className="welcome">YOU ARE WELCOME</h1>
      <div className="log-out d-flex justify-content-between">
        <div>Vijay</div>
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
        {/* <ul>
          {items.map((val, index) => {
            return (
              <table><tr>
                <td> {val}
                </td>
                <td>
                {
                  <span id="span1" onClick={() => deleteTodo(index)}>
                    X
                  </span>
                }
              
                </td>
                </tr></table>
               
            );
          })}
        </ul> */}
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
                      <th scope="row">{index+1}</th>
                      <td>{todos.todo}</td>
                      <td>{moment(todos.dateTime).format("LLLL")}</td>
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
