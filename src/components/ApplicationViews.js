import React from "react";
import { Route } from "react-router-dom";
import { CustomerList } from "./customers/CustomerList";
import { EmployeeForm } from "./employees/EmployeeForm";
import { EmployeeList } from "./employees/EmployeeList";
import { Inventory } from "./inventory/Inventory";
import { LocationsList } from "./locations/LocationsList";
import { MyOrders } from "./orders/MyOrders";

export const ApplicationViews = () => {
    return (
        <>
            <Route path="/inventory">
                <Inventory /> 
            </Route>
            <Route path="/locations">
                <LocationsList /> 
            </Route>
            <Route exact path="/employees">
                <EmployeeList /> 
            </Route>
            <Route path="/employees/hire">
                <EmployeeForm /> 
            </Route>
            <Route path="/customers">
                <CustomerList /> 
            </Route>
            <Route path="/myorders">
                <MyOrders /> 
            </Route>
        </>
    )
}