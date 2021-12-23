import React from "react";
import "../CSS/TodoList.css";
import moment from "moment";
import { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState({
    fields: {
      todo: "",
      dateTime: "",
    },
    errors: {},
  });

  const [todoList, setTodoList] = useState([]);

  const handleTodo = (e) => {
    todos.fields[e.target.name] = e.target.value;
    setTodos({ ...todos });
    if (todos.errors[e.target.name]) {
      todos.errors[e.target.name] = "";
    }
    validate();
  };

  const validate = () => {
    let fields = todos.fields;
    let errors = {};
    let formIsValid = true;
    if (!fields["todo"]) {
      formIsValid = false;
      errors["todo"] = "*please enter task.";
    }
    if (!fields["dateTime"]) {
      formIsValid = false;
      errors["dateTime"] = "*please select date and time.";
    }
    todos.errors = errors;
    setTodos({ ...todos });
    return formIsValid;
  };

  var todoTask = JSON.parse(localStorage.getItem("todoTask"));

  const handleTodoTask = () => {
    if (validate()) {
      if (todoTask === null) {
        todoTask = [
          {
            storedTodo: todos.fields.todo,
            storedDate: todos.fields.dateTime,
            isCompleted: false,
          },
        ];
        localStorage.setItem("todoTask", JSON.stringify(todoTask));
      } else {
        const matchData = todoTask.filter((d) => {
          if (d.storedTodo === todos.fields.todo) {
            return true;
          }
        });
        if (matchData.length === 0) {
          todoTask = [
            ...todoTask,
            {
              storedTodo: todos.fields.todo,
              storedDate: todos.fields.dateTime,
              isCompleted: false,
            },
          ];

          localStorage.setItem("todoTask", JSON.stringify(todoTask));
          setTodos({
            fields: {
              todo: "",
              dateTime: "",
            },
            errors: {},
          });
        } else {
          todos.errors["dateTime"] = "*no duplicate please";
        }
      }
      setTodoList(JSON.parse(localStorage.getItem("todoTask")));
    }
  };

  function deleteTodo(id) {
    if (window.confirm("Do you want to delete!")) {
      const newTodo = todoTask.filter((el, index) => index !== id);

      setTodoList([...newTodo]);
      localStorage.setItem("todoTask", JSON.stringify(newTodo));
    }
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
      <div className="log-out d-flex justify-content-between"></div>

      <div id="myDIV" className="header">
        <h2>My To Do List</h2>
        <input
          name="todo"
          type="text"
          id="myInput"
          required="true"
          onChange={handleTodo}
          value={todos.fields.todo}
          placeholder="Write Task"
          className="form-control-lg"
        />
        <input
          name="dateTime"
          type="dateTime-local"
          id="myDate"
          className="form-control-lg"
          onChange={handleTodo}
          value={todos.fields.dateTime}
        />
        <br></br>
        <button
          className="btn btn-lg btn-primary  signup-btn"
          type="submit"
          onClick={handleTodoTask}
        >
          Add Task
        </button>

        {todos.errors.todo && (
          <p className=" text-danger">{todos.errors.todo}</p>
        )}

        {todos.errors.dateTime && (
          <p className=" text-danger">{todos.errors.dateTime}</p>
        )}

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
