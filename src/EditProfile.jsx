import React ,{useState,useEffect} from 'react'

const EditProfile = () => {
    const [signUpData, setSignUpData] = useState({
        fname:'',
        lname:'',
        phone:'',
        email:'',
        gender:'',
      })
      useEffect(() => {
         setSignUpData(JSON.parse(localStorage.getItem("userDetail"))[0])
      }, [])
      const handleSignUp=(e)=>{
        setSignUpData({...signUpData,[e.target.name]:e.target.value});
     }
   
    return (
        <div>
            <div className="signUp_Form">
        <div className="SignUp">
          First Name:
          <input
            name="firstName"
            type="text"
            defaultValue={signUpData.fname}
            onChange={handleSignUp}
            placeholder="firstName"
            required
            
          />
          <br />
          Last Name:
          <input
          name="lastName"
            type="text"
            defaultValue={signUpData.lname}
            onChange={handleSignUp}
            placeholder="lastName"
            required
          />
          <br />
          Contact Number:
          <input
          name="phoneNumber"
            type="number"
            defaultValue={signUpData.phone}
            onChange={handleSignUp}
            placeholder="phoneNumber"
            required
          />
          <br />
          Email Id:
          <input
          name="email"
            type="email"
            defaultValue={signUpData.email}
            onChange={handleSignUp}
            placeholder="email"
            required
          />
          <br />
          <div>
            Gender: <input type="radio" defaultValue='Male' name="gender" onChange={handleSignUp} checked={signUpData.gender==='Male'} /> Male
            <input type="radio" defaultValue='Female' name="gender"  onChange={handleSignUp} checked={signUpData.gender==='Female'}/> Female
            <input type="radio" defaultValue='Other' name="gender" onChange={handleSignUp} checked={signUpData.gender==='Other'} /> Other
          </div>
          <br />
         
          <br />
          <button className="btn1">Update</button>
          <br />
        </div>
      </div>
        </div>
    )
}

export default EditProfile
