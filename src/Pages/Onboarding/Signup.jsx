import React from "react";
import "../../assets/css/signup.css";
import productLogo from "../../assets/imgs/mimAR-logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../../apis/register";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();
    setLoading(true);
    registerUser(username, email, password, navigate);
    setLoading(false);
  };

  return (
    <div className="signup-page d-flex flex-column p-5">
      <div className="w-100 d-flex flex-row justify-content-center">
        <img src={productLogo} alt="" className="product-logo" />
      </div>
      <h3 className="text-center mt-3">Sign up</h3>
      <p className="mb-2 text-center signup-text">
        Create your account on mimAR Studio today!
      </p>
      <form method="POST" className="d-flex flex-column">
        <div className="d-flex flex-column justify-content-left input-fields my-1">
          <label for="username">Username</label>
          <input
            type="text"
            name="username"
            className="p-1"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
        <div className="d-flex flex-column justify-content-left input-fields my-1">
          <label for="username">Password</label>
          <input
            type="password"
            name="password"
            className="p-1"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {loading ? (
          <input
            type="submit"
            className="btn btn-primary mt-3"
            value="Signing up..."
            style={{ background: "lightgray", border: "1px solid lightgray" }}
            disabled
          />
        ) : (
          <input
            type="submit"
            className="btn btn-primary mt-3"
            value="Signup"
            onClick={register}
          />
        )}

        <p className="login-link mt-1 text-center">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};
