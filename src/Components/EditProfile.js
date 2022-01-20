import React, { useState, useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "./firebase-config";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { authenticate } from "../App";

const EditProfile = () => {
  const [allUserDetails, setAllUserDetails] = useState([]);
  const [handleIsLogin] = useContext(authenticate);

  const [editedData, setEditedData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gender: "",
  });
  const [user, setUser] = useState(null);
  let navigate = useNavigate();

  //....................CHECKING IS USER LOGGEDIN OR NOT.................................
  useEffect(() => {
    let isSubscribed = true;
    onAuthStateChanged(auth, (user) => {
      if (isSubscribed) {
        if (user) {
          setUser(user);
          getlist(user.uid);
        }
      } else setUser(null);
    });
    return () => (isSubscribed = false);
  }, []);

  //..............................FETCHING USER DETAILS FROM FIREBASE...........................
  const getlist = async (id) => {
    const data = await getDocs(collection(db, "users", id, "userDetail"));
    setAllUserDetails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    setEditedData(JSON.parse(localStorage.getItem("userDetails"))[0]);
  }, []);

  //.......................ONCHANGE EVENT............................
  const handleEdit = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  //....................FUNCTION DECLARATION..........................
  const updateDetail = async (id) => {
    const userDoc = doc(db, "users", user.uid, "userDetail", id);
    const newFields = {
      firstName: editedData.firstName,
      lastName: editedData.lastName,
      phoneNumber: editedData.phoneNumber,
      gender: editedData.gender,
    };
    await updateDoc(userDoc, newFields);
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
    allUserDetails.forEach((el) => {
      updateDetail(el.id);
    });
    navigate("/todolist");
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
