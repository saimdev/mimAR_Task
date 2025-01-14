import React, { useEffect } from "react";
import { signout } from "../apis/signout";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    signout(navigate);
  }, []);

  return <div>Logging out..</div>;
};
