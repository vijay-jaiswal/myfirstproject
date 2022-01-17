import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { sendPasswordResetEmail } from "firebase/auth";
import swal from "sweetalert";

function ResetPassword() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const GotoLogin = () => {
    navigate("/");
  };

  const ResetLink = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      swal(" email sent successfully!", "check your mail", "success");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="container padding-bottom-3x mb-2 mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="forgot">
            <h2>Forgot your password?</h2>
            <p>
              Change your password in three easy steps. This will help you to
              secure your password!
            </p>
            <ol className="list-unstyled">
              <li>
                <span className="text-primary text-medium">1. </span>
                Enter your email address below.
              </li>
              <li>
                <span className="text-primary text-medium">2. </span>
                Our system will send you a temporary link
              </li>
              <li>
                <span className="text-primary text-medium">3. </span>
                Use the link to reset your password
              </li>
            </ol>
          </div>
          <form className="card mt-4">
            <div className="card-body">
              <div className="form-group">
                <label>Enter your email address</label>
                <input
                  className="form-control"
                  type="email"
                  placeholder="example:abc@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className=" text-center text-danger">{error}</p>

                <small className="form-text text-muted">
                  Enter the email address you used during the registration .
                  Then we'll email a link to this address.
                </small>
              </div>
            </div>
            <div className="card-footer">
              <button
                className="btn btn-success"
                type="button"
                onClick={ResetLink}
              >
                Get New Password
              </button>
              <button
                className="btn btn-danger"
                type="button"
                onClick={GotoLogin}
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
