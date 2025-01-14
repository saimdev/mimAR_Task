import React from "react";
import "../../assets/css/login.css";
import productLogo from "../../assets/imgs/mimAR-logo.png";
import googleLogo from "../../assets/imgs/google-logo.png";
import githubLogo from "../../assets/imgs/github-logo.png";
import facebookLogo from "../../assets/imgs/facebook-logo.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signin } from "../../apis/signin";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const signinUser = (e) => {
    e.preventDefault();
    setLoading(true);
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }
    signin(email, password, navigate, setLoading);

    // window.location.reload();
  };

  return (
    <div className="login-page d-flex flex-column p-5">
      <div className="w-100 d-flex flex-row justify-content-center">
        <img src={productLogo} alt="" className="product-logo" />
      </div>
      <h3 className="text-center my-3">Login</h3>
      <button
        type="submit"
        className="btn btn-social-media mt-1 d-flex flex-row align-items-center justify-content-center"
      >
        <img src={googleLogo} alt="" className="btn-logo mx-1" />
        <p className="mx-1">Login with Google</p>
      </button>
      <button
        type="submit"
        className="btn btn-social-media mt-1 d-flex flex-row align-items-center justify-content-center"
      >
        <img src={facebookLogo} alt="" className="btn-logo mx-1" />
        <p className="mx-1">Login with Facebook</p>
      </button>
      <button
        type="submit"
        className="btn btn-social-media mt-1 d-flex flex-row align-items-center justify-content-center"
      >
        <img src={githubLogo} alt="" className="btn-logo mx-1" />
        <p className="mx-1">Login with Github</p>
      </button>
      <div className="line-with-text mt-3 mb-2">or</div>
      <form method="POST" className="d-flex flex-column">
        {/* <div className="d-flex flex-column justify-content-left input-fields my-1"/>
                <label for="username">Username</label>
                <input type="text" className="p-1" placeholder="Enter your username">
            </div> */}
        <div className="d-flex flex-column justify-content-left input-fields my-1">
          <label for="username">Email</label>
          <input
            type="email"
            className="p-1"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="d-flex flex-column justify-content-left input-fields my-1">
          <label for="username">Password</label>
          <input
            type="password"
            className="p-1"
            placeholder="Enter your password"
            minLength="8"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="d-flex flex-row align-items-center remember-me">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label for="remember-me" className="px-1">
            Remember me
          </label>
        </div>
        {loading ? (
          <input
            type="submit"
            className="btn btn-primary mt-3"
            value="Loging in..."
            style={{ background: "lightgray", border: "1px solid lightgray" }}
            disabled
          />
        ) : (
          <input
            type="submit"
            onClick={signinUser}
            className="btn btn-primary mt-3"
            value="Login"
          />
        )}

        <p className="signup-link mt-2 text-center">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
        <Link to="/forget" className="forgot-password text-center">
          Forgot Password?
        </Link>
      </form>
    </div>
  );
};
