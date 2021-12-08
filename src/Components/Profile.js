import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext, createContext } from "react";
import swal from "sweetalert";
import Header from "../Components/Header";
import { authenticate } from "../App";
import { logoutContext } from "../Components/Home";

const profileContext = createContext();

function Profile(props) {
  const [isLogin, handleIsLogin] = useContext(authenticate);
  //const useLogoutContext= useContext(logoutContext);
  //useLogoutContext();

  let userData = JSON.parse(localStorage.getItem("userDetail"));
  let navigate = useNavigate();

  function routeHome() {
    navigate("/home");
  }
  function routeEdit() {
    navigate("/edit");
  }

  function handleLogout(e) {
    e.preventDefault();

    localStorage.removeItem("userLogin");
    localStorage.removeItem("access");
    handleIsLogin();

    localStorage.removeItem("userDetail");

    swal("successfully logout!", "You clicked at logout!", "success");

    navigate("/");
  }

  const useProfileContext = [routeHome];

  return (
    <div>
      <profileContext.Provider value={useProfileContext}>
        <Header home={routeHome} edit={routeEdit} logout={handleLogout} />

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
      </profileContext.Provider>
    </div>
  );
}

export default Profile;
export { profileContext };
