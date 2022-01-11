import React from "react"
import { LocationsList } from "./locations/LocationsList";
import { ProductList } from "./products/ProductList";

export const KandyKorner = () => {
    return (
        <>
            <h1>Locations</h1>
            <LocationsList />
            <h1>Products</h1>
            <ProductList />
        </>
    );
}