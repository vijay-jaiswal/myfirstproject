import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import TodoList from "./TodoList";

function Home(props) {
  let navigate = useNavigate();

  function handleProfile(e) {
    e.preventDefault();
    navigate("/profile");
  }
  return (
    <>
      <Header profile={handleProfile} />

      <TodoList/>
    </>
  );
}
export default Home;
