import React from "react";
import "../CSS/TodoList.css";
import moment from "moment";
import { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState({
    todo: "",
    dateTime: "",
  });
  var todoTask = JSON.parse(localStorage.getItem("todoTask"));
  const handleTodoTask = () => {
    if (todoTask === null) {
      todoTask = [
        {
          storedTodo: todos.todo,
          storedDate: todos.dateTime,
          isCompleted: false,
        },
      ];
      localStorage.setItem("todoTask", JSON.stringify(todoTask));
    } else {
      const matchData = todoTask.filter((d) => {
        if (d.storedTodo === todos.todo) {
          return true;
        }
      });
      if (matchData.length === 0) {
        todoTask = [
          ...todoTask,
          {
            storedTodo: todos.todo,
            storedDate: todos.dateTime,
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
    if (window.confirm("Do you want to delete!")) {
      const newTodo = todoTask.filter((el, index) => index !== id);

      setTodoList([...newTodo]);
      localStorage.setItem("todoTask", JSON.stringify(newTodo));
      
    }
  }

  const handleTodo = (e) => {
    setTodos({ ...todos, [e.target.name]: e.target.value });
  };

  function addTodo(e) {
    e.preventDefault();

    validation();
  }

  const completeTodo = (id) => {
    var result = todoTask.map((todo) => {
      if (todo.storedTodo === id.storedTodo) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });

    setTodoList([...result]);

    localStorage.setItem("todoTask", JSON.stringify(result));
  };

  return (
    <>
      {/* <h1 className="welcome">Hello</h1> */}
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
          placeholder="Write Task"
          className="form-control-lg"
        />
        <input
          name="dateTime"
          type="dateTime-local"
          id="myDate"
          className="form-control-lg"
          onChange={handleTodo}
          value={todos.dateTime}
        />
        <br></br>
        <button
          className="btn btn-lg btn-primary  signup-btn"
          type="submit"
          onClick={addTodo}
        >
          Add Task
        </button>
        <p className=" text-danger">{error}</p>

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
                      className={todo.isCompleted ? "complete" : "todo-row"}
                      key={index}
                    >
                      <td>{index + 1}</td>
                      <td onClick={() => completeTodo(todo)} key={index}>
                        {todo.storedTodo}
                      </td>
                      <td>
                        {moment(todo.storedDate).format(
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

export default TodoList;
