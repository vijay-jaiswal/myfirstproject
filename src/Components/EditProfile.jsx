import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Header from "./Header";
import { authenticate } from "../App";
import { profileContext } from "../Components/Profile";

const EditProfile = () => {
  // const [useProfileContext]=useContext(profileContext);
  const [isLogin, handleIsLogin] = useContext(authenticate);

  const [editedData, setEditedData] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    gender: "",
  });
  let navigate = useNavigate();
  let userData = JSON.parse(localStorage.getItem("userDetail"));
  useEffect(() => {}, []);

  const handleEdit = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(editedData);
    navigate("/home");
  };

  function routeHome() {
    navigate("/home");
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

  return (
    <div>
      <Header logout={handleLogout} home={routeHome} />

      <div className="signUp_Form">
        <div className="SignUp">
          <label>First Name:</label>
          <br />
          <input
            name="fname"
            type="text"
            defaultValue={userData.fname}
            onChange={handleEdit}
            placeholder="firstName"
            required
            contentEditable
          />
          <br />

          <label>Last Name:</label>
          <br />
          <input
            name="lname"
            type="text"
            defaultValue={userData.lname}
            onChange={handleEdit}
            placeholder="lastName"
            required
            contentEditable
          />
          <br />

          <label>Contact Number:</label>
          <br />
          <input
            name="phone"
            type="number"
            defaultValue={userData.phone}
            onChange={handleEdit}
            placeholder="phoneNumber"
            required
            contentEditable
          />
          <br />

          <label>Email Id:</label>
          <br />
          <input
            name="email"
            type="email"
            defaultValue={userData.email}
            onChange={handleEdit}
            placeholder="email"
            required
            contentEditable
          />
          <br />
          <div>
            Gender:
            <input
              type="radio"
              value="Male"
              name="gender"
              onChange={handleEdit}
              checked={editedData.gender === "Male"}
              contentEditable
            />
            Male
            <input
              type="radio"
              value="Female"
              name="gender"
              onChange={handleEdit}
              checked={editedData.gender === "Female"}
              contentEditable
            />
            Female
            <input
              type="radio"
              value="Other"
              name="gender"
              onChange={handleEdit}
              checked={editedData.gender === "Other"}
              contentEditable
            />
            Other
          </div>
          <br />
          <br />
          <button className="btn1" onClick={handleUpdate}>
            Update
          </button>
          <br />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
