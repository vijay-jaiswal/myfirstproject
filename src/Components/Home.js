import React from "react";
import { useState, useContext, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { authenticate } from "../App";
import moment from "moment";
import Header from "./Header";
import swal from "sweetalert";

const logoutContext = createContext();

function Home(props) {
  const [isLogin, handleIsLogin] = useContext(authenticate);


  let navigate = useNavigate();

  const [todos, setTodos] = useState({
    todo: "",
    dateTime: "",
  });
  var todoTask = JSON.parse(localStorage.getItem("todoTask"));
  const handleTodoTask = () => {
    if (todoTask === null) {
      todoTask = [
        {
          todo1: todos.todo,
          date1: todos.dateTime,
          isCompleted: false,
        },
      ];
      localStorage.setItem("todoTask", JSON.stringify(todoTask));
    } else {
      const matchData = todoTask.filter((d) => {
        if (d.todo1 === todos.todo) {
          return true;
        }
      });
      if (matchData.length === 0) {
        todoTask = [
          ...todoTask,
          {
            todo1: todos.todo,
            date1: todos.dateTime,
            isCompleted: false,
          },
        ];
        localStorage.setItem("todoTask", JSON.stringify(todoTask));
      } else {
        setError(" no duplicate please");
      }
    }
  };

  const [todoList, setTodoList] = useState([]);


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
  const [error, setError] = useState("");
  function validation() {
    var val = "";
    val = checkTask();
    val += checkDate();

    if (val === "") {
      console.log(todos);
      handleTodoTask();

      console.log(todoList);
      setTodoList(JSON.parse(localStorage.getItem("todoTask")));
    } else {
      setError(val);
      return false;
    }
    setTodos({
      todo: "",
      dateTime: "",
    });
  }
  function deleteTodo(id) {
    setTodoList(todoList.filter((el, index) => index !== id));
    localStorage.setItem("todoTask", JSON.stringify(todoList));
  }

  const handleTodo = (e) => {
    setTodos({ ...todos, [e.target.name]: e.target.value });
  };

  function addTodo(e) {
    e.preventDefault();

    validation();
  }

  let userData = JSON.parse(localStorage.getItem("userDetail"));
  
  function handleProfile(e) {
    e.preventDefault();
    navigate("/profile");
  }
  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("userLogin");
    localStorage.removeItem("access");
    handleIsLogin();

    localStorage.removeItem("userDetail");

    swal("successfully logout!", "You clicked at logout!", "success");

    navigate("/");
  }
  

  const completeTodo =  async(id) => {
    var result = todoTask.map((todo) => {
    // debugger;

      if (todo.todo1 === id.todo1) {
        todo.isCompleted = !todo.isCompleted;

        console.log("completed", id.todo1, todo.todo1);
      }
      return todo;

    });
    

   await setTodoList(result);
    
    localStorage.setItem("todoTask", JSON.stringify(todoList));
  }
  // }
  // useEffect(() => {
  //   // setIsLogin(localStorage.setItem('isLogin',isLogin));
  //   // setAccess(JSON.parse(localStorage.getItem("access")));
  //   localStorage.setItem("todoTask", JSON.stringify(todoList));

  // },[completeTodo] );

  return (
    <>
         

        <Header logout={handleLogout} profile={handleProfile} />

        <h1 className="welcome">Hello </h1>
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
          <p className=" text-black">{error}</p>

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
                {todoTask &&
                  todoTask.map((todo, index) => {
                    return (
                      <tr
                      className={todo.isCompleted ? "complete" : "todo-row"}>
                        <td>{index + 1}</td>
                        <td onClick={()=>completeTodo(todo)}>{todo.todo1}</td>
                        <td>
                          {moment(todo.date1).format("DD-MMMM-YYYY |hh:mm:ss a")}
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
