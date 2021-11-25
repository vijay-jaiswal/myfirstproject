import React from "react";
import { useState, useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { authenticate } from "./App";

function Home(props) {
  const [isLogin,handleIsLogin] = useContext(authenticate);

  const [inputList, setInputList] = useState("");
  const [items, setItems] = useState([]);
  const [inputDate, setInputDate] = useState("");

  function itemEvent(e) {
    setInputList(e.target.value);
  }
 

  function checkTask() {
    if (inputList === "") {
      return " please add task\n";
    } else {
      return "";
    }
  }

  function checkDate() {
    if (inputDate === "") {
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
      setItems((old) => {
        return [...old, [inputList, "  ", inputDate]];
      });

      setInputList("");
      setInputDate("");
    } else {
      alert(val);
      return false;
    }
  }

  function listOfItem() {
    validation();
  }

  function dateEvent(e) {
    setInputDate(e.target.value);
  }

  function deleteItem(id) {
    console.log("deleted");

    setItems((old) => {
      return old.filter((arr, index) => {
        return index !== id;
      });
    });
  }

  let navigate = useNavigate();
  function handleLogout(e) {
    e.preventDefault();
    
    //handleIsLogin();
    localStorage.removeItem("userLogin");
    localStorage.removeItem("access");

    alert("successfully logout");
    navigate("/");
  }
  return (
    <>
      <h1>YOU ARE WELCOME</h1>
      <div className="log-out">
        <button onClick={handleLogout}>LOGOUT</button>
      </div>

      <div id="myDIV" className="header">
        <h2>My To Do List</h2>
        <input
          type="text"
          id="myInput"
          onChange={itemEvent}
          value={inputList}
          placeholder="add task"
        />
        <input
          type="dateTime-local"
          id="myDate"
          onChange={dateEvent}
          value={inputDate}
        />
        <button onClick={listOfItem} className="addBtn">
          Add
        </button>
        <ul>
          {items.map((val, index) => {
            return (
              <li>
                {val}
                {
                  <span id="span1" onClick={() => deleteItem(index)}>
                    X
                  </span>
                }
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
export default Home;
