import React, { useState, useEffect } from "react";

const EditProfile = () => {
  const [editedData, setEditedData] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    gender: "",
  });
  const [userLoginDetails, setUserLoginDetails] = useState({});
  const [allLocalData, setAllLocalData] = useState([])
  const [id, setid] = useState();
  const handleEdit = (e) => {
    const {name,value}=e.target;
    setEditedData({...editedData,[name]:value});
  };

  useEffect(() => {
    setAllLocalData(JSON.parse(localStorage.getItem("auth")));
    setEditedData(JSON.parse(localStorage.getItem("userDetail")));
    setUserLoginDetails(JSON.parse(localStorage.getItem("userDetail")));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(editedData);
    setEditedData({...editedData,id:new Date().getTime().toString()})
    allLocalData.forEach((el,index)=>{
      if(el.phone===userLoginDetails.phone){
        setid(index);
      }
    })
    // allLocalData[id]=editedData;
    
    // if(id){
      setAllLocalData(allLocalData.splice(id,1,editedData));
    localStorage.setItem("auth",JSON.stringify(allLocalData));
    localStorage.setItem("userDetail",JSON.stringify(editedData));
    // }
  };

  return (
    <div>
      <div className="signUp_Form">
        <div className="SignUp">
          First Name:
          <input
            name="fname"
            type="text"
            defaultValue={editedData.fname}
            onChange={handleEdit}
            placeholder="firstName"
            required
            contentEditable
          />
          <br />
          Last Name:
          <input
            name="lname"
            type="text"
            defaultValue={editedData.lname}
            onChange={handleEdit}
            placeholder="lastName"
            required
            contentEditable
          />
          <br />
          Contact Number:
          <input
            name="phone"
            type="number"
            defaultValue={editedData.phone}
            onChange={handleEdit}
            placeholder="phoneNumber"
            required
            contentEditable
          />
          <br />
          Email Id:
          <input
            name="email"
            type="email"
            defaultValue={editedData.email} 
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
              defaultValue="Male"
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
