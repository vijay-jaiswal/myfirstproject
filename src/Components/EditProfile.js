import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Input from "./Input";
import { onAuthStateChanged } from "firebase/auth";

import { db, auth } from "./firebase-config";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const EditProfile = () => {
  const [allUserDetails, setAllUserDetails] = useState([]);
  const [editedData, setEditedData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gender: "",
  });

  const [user, setUser] = useState(null);
  useEffect(() => {
    let isSubscribed = true

    onAuthStateChanged(auth, (user) => {
        if (isSubscribed) {
          if (user) {

        setUser(user);
        getlist(user.uid);
      } }
      else setUser(null);
    });
    return () => isSubscribed = false

  }, []);

  const getlist = async (id) => {
    const data = await getDocs(collection(db, "users", id, "userDetail"));
    setAllUserDetails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  let navigate = useNavigate();
  const handleEdit = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };
  const updateDetail = async (id) => {
    const userDoc = doc(db, "users", user.uid, "userDetail", id);
    const newFields = {
      firstName: editedData.firstName,
      lastName: editedData.lastName,
      phoneNumber: editedData.phoneNumber,
      gender: editedData.gender,
    };
    await updateDoc(userDoc, newFields);
  };
  const handleUpdate = () => {
    allUserDetails.forEach((el) => {
      updateDetail(el.id);
      console.log(el.id);
      console.log(el.firstName);

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
        name="firstName"
        type="text"
        onChange={handleEdit}
        placeholder="First Name"
        value={editedData.firstName}
        
      />
    </div>
             
              <div className="col-xs-6 col-md-6">
                Last Name:
                <Input
                  name="lastName"
                  type="text"
                  onChange={handleEdit}
                  placeholder="Last Name"
                  value={editedData.lastName}
                />
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
            <div>
              Gender:
              <input
                type="radio"
                value="Male"
                name="gender"
                onChange={handleEdit}
                checked={editedData.gender === "Male"}
                // contentEditable
              />
              Male
              <input
                type="radio"
                value="Female"
                name="gender"
                onChange={handleEdit}
                checked={editedData.gender === "Female"}
                // contentEditable
              />
              Female
              <input
                type="radio"
                value="Other"
                name="gender"
                onChange={handleEdit}
                checked={editedData.gender === "Other"}
                // contentEditable
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

// function checkFName() {
//   var pp = /^[a-zA-Z]*$/;
//   if (editedData.firstName === "") {
//     return " please write your first name\n";
//   } else if (!pp.test(editedData.firstName)) {
//     return "only alphabet\n";
//   } else {
//     return "";
//   }
// }
// function checkLName() {
//   var pp = /^[a-zA-Z]*$/;
//   if (editedData.lastName === "") {
//     return " please write your last name\n";
//   } else if (!pp.test(editedData.lastName)) {
//     return "only alphabet\n";
//   } else {
//     return "";
//   }
// }

// function checkPhone() {
//   var pp = /^\d{10}$/;
//   if (editedData.phoneNumber === "") {
//     return " please write your contact number\n";
//   } else if (!pp.test(editedData.phoneNumber)) {
//     return " phone no. should be 10 digit \n";
//   } else {
//     return "";
//   }
// }

// function checkEmail() {
//   var pp = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
//   if (editedData.email === "") {
//     return " please write your email id\n";
//   } else if (!pp.test(editedData.email)) {
//     return " email is not valid \n";
//   } else {
//     return "";
//   }
// }

// function checkGender() {
//   if (editedData.gender === "") {
//     return " please select gender\n";
//   } else {
//     return "";
//   }
// }
// const [error, setError] = useState("");
// const [error1, setError1] = useState("");
// const [error2, setError2] = useState("");
// const [error3, setError3] = useState("");
// const [error4, setError4] = useState("");

// function validation() {
//   var val = "";
//   var val1 = "";

//   var val2 = "";

//   var val3 = "";
//   var val4 = "";

//   val = checkFName();
//   val1 = checkLName();
//   val2 = checkPhone();
//   val3 = checkEmail();
//   val4 = checkGender();
//   console.log(editedData);
//   if (
//     val === "" &&
//     val1 === "" &&
//     val2 === "" &&
//     val3 === "" &&
//     val4 === ""
//   ) {
//     handleUpdate();
//   } else {
//     setError(val);
//     setError1(val1);
//     setError2(val2);
//     setError3(val3);
//     setError4(val4);

//     return false;
//   }
// }
