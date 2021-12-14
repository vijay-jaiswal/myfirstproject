import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";

function Profile(props) {
  let userData = JSON.parse(localStorage.getItem("userDetail"));
  let navigate = useNavigate();

  function routeHome() {
    navigate("/home");
  }
  function routeEdit() {
    navigate("/edit");
  }

  return (
    <div>
      <Header home={routeHome} edit={routeEdit} />

      <div className="users">
        <table>
          <td>
            <tr>First Name:</tr>
            <tr>Last Name:</tr>
            <tr>Email:</tr>
            <tr>Phone No.:</tr>
            <tr>Gender:</tr>
          </td>
          <td>
            <tr>{userData.fname}</tr>
            <tr>{userData.lname}</tr>
            <tr>{userData.email}</tr>
            <tr>{userData.phone}</tr>
            <tr>{userData.gender}</tr>
          </td>
        </table>
      </div>
    </div>
  );
}

export default Profile;
