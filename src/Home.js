import React from "react";
import { useState, useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import "./Home.css";
import { authenticate } from "./App";

function Home() {
  const [isLogin, handleIsLogin] = useContext(authenticate);
   const location=useLocation();
  const [inputList, setInputList] = useState("");
  const [items, setItems] = useState([]);
  const [inputDate, setInputDate] = useState("");
  let navigate = useNavigate();
  function itemEvent(e) {
    setInputList(e.target.value);
  }

  // useEffect(() => {
  //   if(JSON.parse(localStorage.getItem('access'))) {
  //     // navigate.pushState(null, null, location.href);
  //     window.onpopstate = function(event) {
  //       navigation.navigate('home')
  //     };
  //   }
  // }, [])

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

  
  function handleProfile(e) {
    e.preventDefault();
    navigate("profile");

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
  return (
    <>
      <h1 className="welcome">YOU ARE WELCOME</h1>
      <div className="log-out">
        <button onClick={handleLogout}>LOGOUT</button>
      </div>

      <div className="profile">
        <button className="icon" onClick={handleProfile}>PROFILE</button>
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
              <table><tr>
                <td> {val}
                </td>
                <td>
                {
                  <span id="span1" onClick={() => deleteItem(index)}>
                    X
                  </span>
                }
              
                </td>
                </tr></table>
               
            );
          })}
        </ul>
      </div>
    </>
  );
}
export default Home;