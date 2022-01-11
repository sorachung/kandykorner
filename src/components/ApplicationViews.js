import React from "react";
import { Route } from "react-router-dom";
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
        </>
    )
}