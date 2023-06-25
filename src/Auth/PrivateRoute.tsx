// import React from "react";
// import {  Navigate, Route } from "react-router-dom";

import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {
    const token = localStorage.getItem("auth")

    console.log("token", token)

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return <>{token ? <Outlet /> : <Navigate to="/login" />}</>
}

export default PrivateRoute
