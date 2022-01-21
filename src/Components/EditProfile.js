import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import { db } from "./firebase-config";
import { updateDoc, doc } from "firebase/firestore";
import { authenticate } from "../App";

const EditProfile = () => {
  let navigate = useNavigate();
  const [handleIsLogin] = useContext(authenticate);
  const [id, setId] = useState("");
  const [userId, setUserId] = useState("");
  const [editedData, setEditedData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gender: "",
  });
  const [errors, setErrors] = useState({
    error: {},
  });

  useEffect(() => {
    setEditedData(JSON.parse(localStorage.getItem("userDetails"))[0]);
    setUserId(JSON.parse(localStorage.getItem("userId")));
    setId(JSON.parse(localStorage.getItem("id")));
  }, []);

  //.......................ONCHANGE EVENT............................
  const handleEdit = (e) => {
    editedData[e.target.name] = e.target.value;
    setEditedData({ ...editedData });
    if (errors.error[e.target.name]) {
      errors.error[e.target.name] = "";
    }
    validate(e.target.name);
  };
  const validate = (type) => {
    let errors = {};
    let formIsValid = true;
    switch (type) {
      case "firstName":
        if (!editedData["firstName"]) {
          formIsValid = false;
          errors["firstName"] = "*Please enter your firstName.";
        }
        if (editedData["firstName"]) {
          if (!(editedData["firstName"].length > 2)) {
            formIsValid = false;
            errors["firstName"] = "*FirstName must be atleast 3 character";
          }
        }
        if (editedData["firstName"] !== "") {
          if (!editedData["firstName"].match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            errors["firstName"] =
              "*FirstName must be  alphabet characters only.";
          }
        }
        break;
      case "lastName":
        if (!editedData["lastName"]) {
          formIsValid = false;
          errors["lastName"] = "*Please enter your lastName.";
        }
        if (editedData["lastName"]) {
          if (!(editedData["lastName"].length > 2)) {
            formIsValid = false;
            errors["lastName"] = "*lastName must be atleast 3 character";
          }
        }
        if (typeof editedData["lastName"] !== "undefined") {
          if (!editedData["lastName"].match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            errors["lastName"] = "*lastName must be alphabet characters only.";
          }
        }
        break;
      case "phoneNumber":
        if (typeof editedData["phoneNumber"] !== "undefined") {
          if (!editedData["phoneNumber"].match(/^\d{10}$/)) {
            formIsValid = false;
            errors["phoneNumber"] = "*PhoneNumber must be 10 digit only ";
          }
        }
        if (!editedData["phoneNumber"]) {
          formIsValid = false;
          errors["phoneNumber"] = "*Please enter your phoneNumber ";
        }
        break;

      default:
        break;
    }
    errors.error = errors;
    setErrors({ ...errors });
    return formIsValid;
  };

  // ....................FUNCTION DECLARATION..........................
  const updateDetail = async (userId) => {
    const userDoc = doc(db, "users", id, "userDetail", userId);
    const neweditedData = {
      firstName: editedData.firstName,
      lastName: editedData.lastName,
      phoneNumber: editedData.phoneNumber,
      gender: editedData.gender,
    };
    await updateDoc(userDoc, neweditedData);
    localStorage.setItem(
      "userDetails",
      JSON.stringify([
        {
          firstName: editedData.firstName,
          lastName: editedData.lastName,
          phoneNumber: editedData.phoneNumber,
          gender: editedData.gender,
        },
      ])
    );
    handleIsLogin();
  };

  //..........................ONCLICK EVENT(UPDATE).....................
  const handleUpdate = () => {
    if (
      validate("firstName") &&
      validate("lastName") &&
      validate("phoneNumber")
    ) {
      updateDetail(userId);
      navigate("/todolist");
    }
  };

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>

      <div className="container-fluid" id="wrap">
        <div className="row  justify-content-center">
          <div className="col-md-6 col-md-offset-3 justify-content-center">
            <legend className="text-center">EDIT PROFILE</legend>
            <div className="row">
              <div className="col-xs-6 col-md-6">
                First Name:
                <Input
                  name="firstName"
                  type="text"
                  onChange={handleEdit}
                  placeholder="First Name"
                  value={editedData.firstName}
                />
                {errors.error.firstName && (
                  <p className=" text-danger">{errors.error.firstName}</p>
                )}
              </div>

              <div className="col-xs-6 col-md-6">
                Last Name:
                <Input
                  name="lastName"
                  type="text"
                  onChange={handleEdit}
                  placeholder="Last Name"
                  value={editedData.lastName}
                />{" "}
                {errors.error.lastName && (
                  <p className=" text-danger">{errors.error.lastName}</p>
                )}
              </div>
            </div>
            Phone Number:
            <Input
              name="phoneNumber"
              type="number"
              onChange={handleEdit}
              placeholder="Phone Number"
              value={editedData.phoneNumber}
            />
            {errors.error.phoneNumber && (
              <p className=" text-danger">{errors.error.phoneNumber}</p>
            )}
            <div>
              Gender:
              <input
                type="radio"
                value="Male"
                name="gender"
                onChange={handleEdit}
                checked={editedData.gender === "Male"}
              />
              Male
              <input
                type="radio"
                value="Female"
                name="gender"
                onChange={handleEdit}
                checked={editedData.gender === "Female"}
              />
              Female
              <input
                type="radio"
                value="Other"
                name="gender"
                onChange={handleEdit}
                checked={editedData.gender === "Other"}
              />
              Other
            </div>
            <button
              className="btn btn-lg btn-primary btn-block signup-btn"
              type="button"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
