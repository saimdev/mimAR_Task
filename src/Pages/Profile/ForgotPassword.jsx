import React from "react";
import "../../assets/css/signup.css";
import productLogo from "../../assets/imgs/mimAR-logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { passwordForget } from "../../apis/passwordForget";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const forgetPassword = (e) => {
    e.preventDefault();
    setLoading(true);
    passwordForget(email, navigate, setLoading);
  };

  return (
    <div className="signup-page d-flex flex-column p-5">
      <div className="w-100 d-flex flex-row justify-content-center">
        <img src={productLogo} alt="" className="product-logo" />
      </div>
      <h3 className="text-center mt-3">Recover your account!</h3>
      <form method="POST" className="d-flex flex-column">
        <div className="d-flex flex-column justify-content-left input-fields my-1">
          <label for="username">Email</label>
          <input
            type="email"
            className="p-1"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {loading ? (
          <input
            type="submit"
            className="btn btn-success mt-3"
            value="Sending mail..."
            style={{ background: "lightgray", border: "1px solid lightgray" }}
            disabled
          />
        ) : (
          <input
            type="submit"
            className="btn btn-success mt-3"
            value="Send New Password"
            onClick={forgetPassword}
          />
        )}

        <p className="login-link mt-1 text-center">
          Remember your password? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};
