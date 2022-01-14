import React, { useEffect, useState } from "react";
import { getAllProductsExpandProductType, getPurchasesProductsByCustomer } from "../ApiManager";

export const MyOrders = () => {
    const [products, updateProducts] = useState([]);
    const [myProducts, updatemyProducts] = useState([]);
    const [myPurchasesProducts, updatePurchasesProducts] = useState([])

    const getProducts = () => {
        return getAllProductsExpandProductType()
            .then(data => updateProducts(data))
    }

    const getMyPurchasesProducts = () => {
        return getPurchasesProductsByCustomer()
        .then(data => {
            const myPurchasesProducts = [];
            data.forEach(purchase => {
                purchase.purchasesProducts.forEach(pp => myPurchasesProducts.push(pp))
            })
            updatePurchasesProducts(myPurchasesProducts)
        
        })
    }

    useEffect(() => {
        getProducts()
        getMyPurchasesProducts()
    }, []);

    useEffect(() => {
        updatemyProducts(myPurchasesProducts.map(mypp => {
            return products.find(product => product.id === mypp.productId)
        }))
    }, [myPurchasesProducts]);   

    return (
        <>
            <h1>My Orders</h1>
            <div className="products">
                {myProducts.length > 0? myProducts.reduce((acc, currVal) => {
                    if(acc.find((el) => el.name === currVal.name)) {
                        acc.find((el) => el.name === currVal.name).quantity += 1
                    } else {
                        currVal.quantity = 1;
                        acc.push(currVal);
                    }
                    return acc;
                }, []).map( product => {
                    return <div key={`product--${product.id}`}>
                        <h3>{product.brand} {product.name} - {product.weight} oz</h3>
                        <p>Amount bought: {product.quantity}</p>
                        <p>Total cost: {(product.price * product.quantity).toLocaleString("en-US", {style:"currency", currency:"USD"})}</p>
                    </div>
                }) : ""}
            </div> 
        </>
    )
}


