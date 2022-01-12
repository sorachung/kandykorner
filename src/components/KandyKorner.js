import React from "react"
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { NavBar } from "./nav/NavBar";

export const KandyKorner = () => {
    return (
        <>
            <Route
                render={ () => {
                    if(localStorage.getItem("kandy_customer")) {
                        return (
                            <>
                                <NavBar />
                                <ApplicationViews />
                            </>
                        )
                    } else {
                        return <Redirect to="/login" />
                    }
                }}
            />

            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
        </>
    );
}