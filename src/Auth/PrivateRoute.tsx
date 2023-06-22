// import React from "react";
// import {  Navigate, Route } from "react-router-dom";

// const PrivateRoute = (props:any) => {
//   // const isAuth  = false

//   const token = localStorage.getItem("auth");

//   console.log("token", token);

//   return <>{token ? <Route {...props} /> : < Navigate to="/login" />}</>;
// };

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuth = false

  const token = localStorage.getItem("auth");

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return isAuth ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;