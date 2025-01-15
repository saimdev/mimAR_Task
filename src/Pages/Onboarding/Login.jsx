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
import { useGoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../../apis/googleLogin";
import FacebookLogin from "react-facebook-login";
import { facebookLogin } from "../../apis/facebookLogin";
import GitHubLogin from "react-github-login";
// import { UserContext } from "../../Context/UserContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleUser, setGoogleUser] = useState(null);
  //   const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    console.log("Window location:", window.location.href); // Check full URL
    const queryString = window.location.search; // Extract query string
    console.log("Query String:", queryString);

    const urlParams = new URLSearchParams(queryString); // Parse query params
    const codeParam = urlParams.get("code"); // Extract 'code'

    if (codeParam) {
      console.log("GitHub Code Found:", codeParam);
      // Perform additional actions if needed
    } else {
      console.log("No GitHub Code Found");
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

  const loginGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setGoogleUser(codeResponse);
      console.log(codeResponse);
    },
    onError: (error) => window.alert(JSON.stringify(error)),
  });

  useEffect(() => {
    googleLogin(googleUser, navigate);

    // navigate("/home");
  }, [googleUser]);

  const handleFacebookCallback = (response) => {
    facebookLogin(response, navigate);

    // const { accessToken } = response;
    // try {
    //   const res = await fetch(
    //     `https://graph.facebook.com/me?fields=name,email,picture&access_token=${accessToken}`
    //   );
    //   const data = await res.json();
    //   console.log("Graph API Data:", data);
    // } catch (error) {
    //   console.error("Error fetching data from Graph API:", error);
    // }
  };

  const loginWithGithub = () => {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=Ov23limBVVW5jwAa4QyG"
    );
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
        onClick={() => loginGoogle()}
        style={{ background: "white", color: "black" }}
      >
        <img src={googleLogo} alt="" className="btn-logo mx-1" />
        <p className="mx-1">Login with Google</p>
      </button>
      {/* <button
        type="submit"
        className="btn btn-social-media mt-1 d-flex flex-row align-items-center justify-content-center"
      >
        <img src={facebookLogo} alt="" className="btn-logo mx-1" />
        <p className="mx-1">Login with Facebook</p>
      </button> */}
      <FacebookLogin
        appId="1388570825887445"
        autoLoad={false}
        fields="name,email,picture"
        callback={handleFacebookCallback}
      />
      <button
        type="submit"
        className="btn btn-social-media mt-1 d-flex flex-row align-items-center justify-content-center"
        style={{ background: "white", color: "black" }}
        onClick={loginWithGithub}
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
