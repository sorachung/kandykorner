import React from "react";
import { Route } from "react-router-dom";
import { EmployeeList } from "./employees/EmployeeList";
import { LocationsList } from "./locations/LocationsList";
import { ProductList } from "./products/ProductList";

export const ApplicationViews = () => {
    return (
        <>
            <Route path="/products">
                <ProductList />
            </Route>
            <Route path="/locations">
                <LocationsList /> 
            </Route>
            <Route path="/employees">
                <EmployeeList /> 
            </Route>
        </>
    )
}