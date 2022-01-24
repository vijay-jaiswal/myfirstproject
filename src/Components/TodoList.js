import React from "react";
import "../CSS/TodoList.css";
import moment from "moment";
import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function TodoList() {
  const [todoTask, setTodoTask] = useState([]);
  const [id, setId] = useState("");

  const [todos, setTodos] = useState({
    fields: {
      todo: "",
      dateTime: "",
    },
    errors: {},
  });

  useEffect(() => {
    getlist(JSON.parse(localStorage.getItem("id")));
    setId(JSON.parse(localStorage.getItem("id")));
  }, []);

  //....................ONCHANGE EVENT............................
  const handleTodo = (e) => {
    todos.fields[e.target.name] = e.target.value;
    setTodos({ ...todos });
    if (todos.errors[e.target.name]) {
      todos.errors[e.target.name] = "";
    }
    validate(e.target.name);
  };

  //...........................VALIDATION.......................
  const validate = (type) => {
    let fields = todos.fields;
    let errors = {};
    let formIsValid = true;
    switch (type) {
      case "todo":
        if (!fields["todo"]) {
          formIsValid = false;
          errors["todo"] = "*please enter task.";
        }
        break;
      case "dateTime":
        if (!fields["dateTime"]) {
          formIsValid = false;
          errors["dateTime"] = "*please select date and time.";
        }
        break;
      default:
        break;
    }
    todos.errors = errors;
    setTodos({ ...todos });
    return formIsValid;
  };

  //......................FETCHING TODOLIST FROM FIREBASE.........................
  const getlist = async (id) => {
    const data = await getDocs(collection(db, "users", id, "todoTask"));
    setTodoTask(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  //...........................ONCLICK EVENT(ADDING TODO).......................................
  const handleTodoTask = async (e) => {
    e.preventDefault();
    if (validate("todo") && validate("dateTime")) {
      if (todoTask === null) {
        await addDoc(collection(db, "users", id, "todoTask"), {
          storedTodo: todos.fields.todo.trim(),
          storedDate: todos.fields.dateTime,
          isCompleted: false,
        });
      } else {
        const matchData = todoTask.filter((d) => {
          return d.storedTodo === todos.fields.todo.trim();
        });
        if (matchData.length === 0) {
          await addDoc(collection(db, "users", id, "todoTask"), {
            storedTodo: todos.fields.todo.trim(),
            storedDate: todos.fields.dateTime,
            isCompleted: false,
          });
          getlist(id);

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
    }
  };

  //.......................DELETE TODO.......................
  const deleteTodo = async (todoId) => {
    const userDoc = doc(db, "users", id, "todoTask", todoId);
    await deleteDoc(userDoc);
    getlist(id);
  };

  //......................COMPLETED TODO........................
  const completeTodo = async (todoId, isCompleted) => {
    const userDoc = doc(db, "users", id, "todoTask", todoId);
    const newFields = { isCompleted: !isCompleted };
    await updateDoc(userDoc, newFields);
    getlist(id);
  };

  return (
    <>
      <br></br>
      <br></br>
      <br></br>

      <div className="container-fluid" id="wrap">
        <div className="row  justify-content-center">
          <div className="col-md-6 col-md-offset-3 justify-content-center">
            <legend className="text-center">My To Do List</legend>
            <div className="row">
              <div className="col-xs-5 col-md-5">
                <input
                  name="todo"
                  type="text"
                  required={true}
                  className="form-control-lg"
                  onChange={handleTodo}
                  value={todos.fields.todo}
                  placeholder="Write Task"
                />
                {todos.errors.todo && (
                  <p className=" text-danger">{todos.errors.todo}</p>
                )}
              </div>
              <div className="col-xs-7 col-md-7">
                <input
                  name="dateTime"
                  type="dateTime-local"
                  className="form-control-lg"
                  onChange={handleTodo}
                  value={todos.fields.dateTime}
                />
                {todos.errors.dateTime && (
                  <p className=" text-danger">{todos.errors.dateTime}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center links">
        <button
          className="btn btn-lg   signup-btn "
          type="button"
          onClick={handleTodoTask}
        >
          Add Task
        </button>
      </div>

      <div className="mt-4 bg-secondary">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Sr. No</th>
              <th className="text-center">Todo List</th>
              <th className="text-center">Date</th>
              <th className="text-center">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {todoTask &&
              todoTask.map((todo, index) => {
                return (
                  <tr
                    key={index}
                    className={todo.isCompleted ? "complete" : "todo-row"}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={todo.isCompleted}
                        onChange={() => completeTodo(todo.id, todo.isCompleted)}
                      ></input>
                    </td>
                    <td>{index + 1}</td>
                    <td className="text-center">{todo.storedTodo}</td>
                    <td className="text-center">
                      {moment(todo.storedDate).format(
                        "DD-MMMM-YYYY |hh:mm:ss a"
                      )}
                    </td>
                    <td className="text-center">
                      {todo.isCompleted ? "COMPLETED" : "UN-COMPLETED"}
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-outline-danger text-black bg-danger"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TodoList;
