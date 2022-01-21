import React from "react";
import "../CSS/TodoList.css";
import moment from "moment";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function TodoList() {
  const [user, setUser] = useState(null);
  const [todoTask, setTodoTask] = useState([]);
  const [todos, setTodos] = useState({
    fields: {
      todo: "",
      dateTime: "",
    },
    errors: {},
  });

  //....................CHECKING IS USER LOGGEDIN OR NOT.................................
  useEffect(() => {
    let isSubscribed = true;
    onAuthStateChanged(auth, (user) => {
      if (isSubscribed) {
        if (user) {
          setUser(user);
          getlist(user.uid);
        }
      } else setUser(null);
    });
    return () => (isSubscribed = false);
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
        await addDoc(collection(db, "users", user.uid, "todoTask"), {
          storedTodo: todos.fields.todo.trim(),
          storedDate: todos.fields.dateTime,
          isCompleted: false,
        });
      } else {
        const matchData = todoTask.filter((d) => {
          return d.storedTodo === todos.fields.todo.trim();
        });
        if (matchData.length === 0) {
          await addDoc(collection(db, "users", user.uid, "todoTask"), {
            storedTodo: todos.fields.todo.trim(),
            storedDate: todos.fields.dateTime,
            isCompleted: false,
          });
          getlist(user.uid);

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
  const deleteTodo = async (id) => {
    const userDoc = doc(db, "users", user.uid, "todoTask", id);
    await deleteDoc(userDoc);
    getlist(user.uid);
  };

  //......................COMPLETED TODO........................
  const completeTodo = async (id, isCompleted) => {
    const userDoc = doc(db, "users", user.uid, "todoTask", id);
    const newFields = { isCompleted: !isCompleted };
    await updateDoc(userDoc, newFields);
    getlist(user.uid);
  };

  return (
    <>
      <div className="log-out d-flex justify-content-between"></div>
      <br></br>

      <div id="myDIV" className="header">
        <h2>My To Do List</h2>
        <input
          name="todo"
          type="text"
          id="myInput"
          required={true}
          onChange={handleTodo}
          value={todos.fields.todo}
          placeholder="Write Task"
          className="form-control-lg"
        />
        {todos.errors.todo && (
          <p className=" text-danger">{todos.errors.todo}</p>
        )}

        <input
          name="dateTime"
          type="dateTime-local"
          id="myDate"
          className="form-control-lg"
          onChange={handleTodo}
          value={todos.fields.dateTime}
        />
        {todos.errors.dateTime && (
          <p className=" text-danger">{todos.errors.dateTime}</p>
        )}

        <br></br>
        <button
          className="btn btn-lg btn-primary  signup-btn"
          type="button"
          onClick={handleTodoTask}
        >
          Add Task
        </button>

        <div className="mt-4 bg-warning">
          <table className="table">
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
                      <td
                        onClick={() => completeTodo(todo.id, todo.isCompleted)}
                        key={index}
                      >
                        {todo.storedTodo}
                      </td>
                      <td>
                        {moment(todo.storedDate).format(
                          "DD-MMMM-YYYY |hh:mm:ss a"
                        )}
                      </td>
                      <td>
                        <span id="span1" onClick={() => deleteTodo(todo.id)}>
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
