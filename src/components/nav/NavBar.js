import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="navbar__link" to="/inventory">Inventory</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/locations">Locations</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/employees">Employees</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/customers">Customers</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/myorders">My Orders</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="#"
                onClick={
                    () => {localStorage.removeItem("kandy_customer")} 
                }>Logout</Link>
            </li>

        </ul>
    )
}