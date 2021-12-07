import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext ,createContext} from "react";
import swal from 'sweetalert';
import Header from "./Header";



import Home, { logoutContext } from "./Home";
 

function Profile(props) {
 

  const logout1 = useContext(logoutContext);

  let userData = JSON.parse(localStorage.getItem("userDetail"));
  let navigate = useNavigate();

   function routeHome(){
    navigate("/home");

   }
   function routeEdit(){
    navigate("/edit");
     
  }
  
  function handleLogout(e) {
    e.preventDefault();

    localStorage.removeItem("userLogin");
    localStorage.removeItem("access");
    localStorage.removeItem("userDetail");

    swal("successfully logout!", "You clicked at logout!", "success");

    navigate("/");
  }
  
  return (
    <div>
    <Header home={routeHome}  edit={routeEdit}  logout={handleLogout} />
      
      <div className="users">
        <table>
          <td>
          <tr>
           First Name:
          </tr>
<tr>
 Last Name:
</tr>
<tr>
           Email:
          </tr>
          <tr>
           Phone No.:
          </tr>
          <tr>
         Gender:
          </tr>
          </td>
          <td>
          <tr>
          {userData.fname}
          </tr>
<tr>
{userData.lname}
</tr>
<tr>
{userData.email}
          </tr>
          <tr>
          {userData.phone}
          </tr>
          <tr>
          {userData.gender}
          </tr>
          </td>
         
          </table>
      </div>
    </div>
  );
}

export default Profile;
