import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Input from "./Input";

const EditProfile = () => {
  const [userLoginDetails, setUserLoginDetails] = useState({});
  const [allLocalData, setAllLocalData] = useState([]);

  const [editedData, setEditedData] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    gender: "",
  });

  useEffect(() => {
    setAllLocalData(JSON.parse(localStorage.getItem("auth")));
    setEditedData(JSON.parse(localStorage.getItem("userDetail")));
    setUserLoginDetails(JSON.parse(localStorage.getItem("userDetail")));
  }, []);
  let navigate = useNavigate();
  const handleEdit = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(editedData);

    allLocalData.forEach((el, index) => {
      if (el.phone === userLoginDetails.phone) {
        console.log(index);
        setAllLocalData(allLocalData.splice(index, 1, editedData));
        localStorage.setItem("userDetail", JSON.stringify(editedData));

        localStorage.setItem("auth", JSON.stringify(allLocalData));
      }
    });

    navigate("/home");
  };

  function routeHome() {
    navigate("/home");
  }

  return (
    <div>
      <Header home={routeHome} />

      <br></br>
      <br></br>
      <br></br>

      <div className="container-fluid" id="wrap">
        <div className="row  justify-content-center">
          <div className="col-md-6 col-md-offset-3 justify-content-center">
            <legend>EDIT PROFILE</legend>
            <div className="row">
              <div className="col-xs-6 col-md-6">
                {/* <label>name</label> */}
                First Name:{" "}
                <Input
                  name={"fname"}
                  type={"text"}
                  onChange={handleEdit}
                  placeholder={"First Name"}
                  defaultValue={editedData.fname}
                />
                {/* <p className=" text-danger">{error}</p> */}
              </div>
              <div className="col-xs-6 col-md-6">
                Last Name:
                <Input
                  name={"lname"}
                  type={"text"}
                  onChange={handleEdit}
                  placeholder={"Last Name"}
                  defaultValue={editedData.lname}
                />
                {/* <p className=" text-danger">{error1}</p> */}
              </div>
            </div>
            Phone Number:
            <Input
              name={"phone"}
              type={"number"}
              onChange={handleEdit}
              placeholder={"Phone Number"}
              defaultValue={editedData.phone}
            />
            {/* <p className=" text-danger">{error2}</p> */}
            Email Id:
            <Input
              name={"email"}
              type={"email"}
              onChange={handleEdit}
              placeholder={"Email"}
              defaultValue={editedData.email}
            />
            {/* <p className=" text-danger">{error3}</p> */}
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
            {/* <p className=" text-danger">{error4}</p> */}
            <br />
            <button
              className="btn btn-lg btn-primary btn-block signup-btn"
              type="submit"
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
