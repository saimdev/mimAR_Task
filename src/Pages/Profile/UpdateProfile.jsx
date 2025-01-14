import React from "react";
import "../../assets/css/home.css";
import "../../assets/css/signup.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../apis/getUserData";
import { Link } from "react-router-dom";
import { updateProfile } from "../../apis/updateProfile";

export const UpdateProfile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getUserData(setEmail, setUsername, navigate, setLoading);
  }, []);

  const profileUpdate = (e) => {
    e.preventDefault();
    updateProfile(email, username, password, navigate);
  };

  return (
    <div className="container dashboard d-flex flex-column p-3">
      {loading ? (
        <div></div>
      ) : (
        <div>
          <div className="w-100 d-flex flex-row ">
            <Link to="/home" className="btn">
              Back
            </Link>
          </div>
          <h2 className="text-center text-white">UpdateProfile</h2>
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
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {loading ? (
              <input
                type="submit"
                className="btn btn-success mt-3"
                value="Updating..."
                style={{
                  background: "lightgray",
                  border: "1px solid lightgray",
                }}
                disabled
              />
            ) : (
              <input
                type="submit"
                className="btn btn-success mt-3"
                value="Update Profile"
                onClick={profileUpdate}
              />
            )}
          </form>
        </div>
      )}
    </div>
  );
};
