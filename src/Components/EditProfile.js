import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Input from "./Input";

import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";

const EditProfile = () => {
  const [userLoginDetails, setUserLoginDetails] = useState({});
  const [allLocalData, setAllLocalData] = useState([]);
  const listCollectionRef = collection(db, "users");
  const userDetail1 = collection(db, "userDetail");

  useEffect(() => {
    const getlist = async () => {
      const data = await getDocs(userDetail1);
      setUserLoginDetails(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    getlist();
  }, [userDetail1]);

  // const [todoTask, setTodoTask] = useState([]);

  const [editedData, setEditedData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    gender: "",
  });
  function checkFName() {
    var pp = /^[a-zA-Z]*$/;
    if (editedData.firstName === "") {
      return " please write your first name\n";
    } else if (!pp.test(editedData.firstName)) {
      return "only alphabet\n";
    } else {
      return "";
    }
  }
  function checkLName() {
    var pp = /^[a-zA-Z]*$/;
    if (editedData.lastName === "") {
      return " please write your last name\n";
    } else if (!pp.test(editedData.lastName)) {
      return "only alphabet\n";
    } else {
      return "";
    }
  }

  function checkPhone() {
    var pp = /^\d{10}$/;
    if (editedData.phoneNumber === "") {
      return " please write your contact number\n";
    } else if (!pp.test(editedData.phoneNumber)) {
      return " phone no. should be 10 digit \n";
    } else {
      return "";
    }
  }

  function checkEmail() {
    var pp = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if (editedData.email === "") {
      return " please write your email id\n";
    } else if (!pp.test(editedData.email)) {
      return " email is not valid \n";
    } else {
      return "";
    }
  }

  function checkGender() {
    if (editedData.gender === "") {
      return " please select gender\n";
    } else {
      return "";
    }
  }
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");
  const [error4, setError4] = useState("");

  function validation() {
    var val = "";
    var val1 = "";

    var val2 = "";

    var val3 = "";
    var val4 = "";

    val = checkFName();
    val1 = checkLName();
    val2 = checkPhone();
    val3 = checkEmail();
    val4 = checkGender();
    console.log(editedData);
    if (
      val === "" &&
      val1 === "" &&
      val2 === "" &&
      val3 === "" &&
      val4 === ""
    ) {
      handleUpdate();
    } else {
      setError(val);
      setError1(val1);
      setError2(val2);
      setError3(val3);
      setError4(val4);

      return false;
    }
  }

  useEffect(() => {
    const getlist = async () => {
      const data = await getDocs(userDetail1);
      setEditedData(data.docs.map((doc) => ({ ...doc.data() })));
    };

    getlist();
  }, [userDetail1]);

  useEffect(() => {
    const getlist = async () => {
      const data = await getDocs(listCollectionRef);
      setAllLocalData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getlist();
  }, [listCollectionRef]);

  let navigate = useNavigate();
  const handleEdit = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };
  const handleUpdate = (e) => {
    console.log(editedData);

    allLocalData.forEach((el, index) => {
      if (el.phoneNumber === userLoginDetails.phoneNumber) {
        console.log(index);
        setAllLocalData(allLocalData.splice(index, 1, editedData));
        addDoc(userDetail1, {
          editedData,
        });
        addDoc(listCollectionRef, {
          allLocalData,
        });
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
                First Name:
                <Input
                  name={"firstName"}
                  type={"text"}
                  onChange={handleEdit}
                  placeholder={"First Name"}
                  value={editedData}
                />
                <p className=" text-danger">{error}</p>
              </div>
              <div className="col-xs-6 col-md-6">
                Last Name:
                <Input
                  name={"lastName"}
                  type={"text"}
                  onChange={handleEdit}
                  placeholder={"Last Name"}
                  value={editedData.lastName}
                />
                <p className=" text-danger">{error1}</p>
              </div>
            </div>
            Phone Number:
            <Input
              name={"phoneNumber"}
              type={"number"}
              onChange={handleEdit}
              placeholder={"Phone Number"}
              value={editedData.phoneNumber}
            />
            <p className=" text-danger">{error2}</p>
            Email Id:
            <Input
              name={"email"}
              type={"email"}
              onChange={handleEdit}
              placeholder={"Email"}
              value={editedData.email}
            />
            <p className=" text-danger">{error3}</p>
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
            <p className=" text-danger">{error4}</p>
            <br />
            <button
              className="btn btn-lg btn-primary btn-block signup-btn"
              type="submit"
              onClick={validation}
            >
              Update
            </button>
          </div>
        </div>
      </div>
      {/* ); */}
      {/* }) */}
      {/* } */}
    </div>
  );
};

export default EditProfile;
