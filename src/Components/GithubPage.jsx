import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { githubLogin } from "../apis/githubLogin";

const GithubPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");
  console.log("Code", code);

  useEffect(() => {
    if (!code) {
      navigate("/login");
    } else {
      githubLogin(code, navigate);
    }
  }, []);

  return <div></div>;
};

export default GithubPage;
