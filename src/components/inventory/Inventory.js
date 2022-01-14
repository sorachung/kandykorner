import React, { useState, useEffect } from "react";
import { getAllProductsExpandProductType } from "../ApiManager";
import { InventoryList } from "./InventoryList";
import { InventorySearch } from "./InventorySearch";

export const Inventory = () => {
    const [searchText, updateSearchText] = useState("");

    return (
        <>
            <InventorySearch updateSearchText={updateSearchText}/>
            <InventoryList searchText={searchText} />
        </>
    )
}