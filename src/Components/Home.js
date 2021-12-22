import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import TodoList from "./TodoList";

function Home(props) {
  let navigate = useNavigate();

  function routeEdit() {
    navigate("/edit");
  }
  return (
    <>
      <Header edit={routeEdit} />
<br></br>
<br></br>


      <TodoList />
    </>
  );
}
export default Home;
