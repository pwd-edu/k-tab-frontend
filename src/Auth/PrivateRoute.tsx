import React from "react";
import {  Navigate, Route } from "react-router-dom";

const PrivateRoute = (props:any) => {
  // const isAuth  = false

  const token = localStorage.getItem("auth");

  console.log("token", token);

  return <>{token ? <Route {...props} /> : < Navigate to="/login" />}</>;
};

export default PrivateRoute;