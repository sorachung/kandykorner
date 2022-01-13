import React, { useEffect, useState } from "react";

export const MyOrders = () => {
    const [products, updateProducts] = useState([]);
    const [myPurchases, updateMyPurchases] = useState([]);
    const [purchasesProducts, updatePurchasesProducts] = useState([])

    const getProducts = () => {
        return fetch("http://localhost:8088/products?_expand=productType&_sort=productType.category&_order=asc")
            .then(response => response.json())
            .then(products => updateProducts(products))
    }
    
    const getPurchasesProducts = () => {
        return fetch("http://localhost:8088/purchasesProducts?_expand=product")
            .then(response => response.json())
            .then(data => updatePurchasesProducts(data))
    }

    const getMyPurchases = () => {
        return fetch(`http://localhost:8088/purchases?customerId=${localStorage.getItem("kandy_customer")}`)
            .then(response => response.json())
            .then(data => updateMyPurchases(data))
    }

    useEffect(() => {
        getProducts()
        getMyPurchases()
        getPurchasesProducts()
    }, []);

    const myProductsPurchases = purchasesProducts.filter(mypp => {
        return myPurchases.find(purchase => purchase.id === mypp.purchaseId)
    })

    return (
        <>
            <h1>My Orders</h1>
            <div className="products">
                {myProductsPurchases.map(mypp => {
                    return <div key={`product--${mypp.product.id}`}>
                        <h3>{mypp.product.brand} {mypp.product.name} - {mypp.product.weight}</h3>
                        <p>{mypp.product.price.toLocaleString("en-US", {style:"currency", currency:"USD"})}</p>
                    </div>
                })}
            </div>
        </>
    )
}


