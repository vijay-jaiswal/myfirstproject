import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  let userData = JSON.parse(localStorage.getItem("userDetail"));
  //  let data = JSON.parse(localStorage.getItem("auth"));
  // const same = data.filter((d) => d.email === userData || d.phone === userData);
  //console.log(same.length);
  // console.log(data.length);
  console.log(userData.length);
  console.log(userData);

  return (
    <div>
      <div className="users">
        <div className="user">User First Name={userData.fname}</div>
        <div className="user">User Last Name ={userData.lname}</div>
        <div className="user">User Email={userData.email}</div>
        <div className="user">User Phone No.={userData.phone}</div>
        <div className="user">User Gender={userData.gender}</div>
        <h6>click to go back to home page </h6>
        <div className='d-flex justify-content-between'>
           <div><Link to="/home">HOME</Link></div>
           <div><Link to="/home/profile/edit">Edit</Link></div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
