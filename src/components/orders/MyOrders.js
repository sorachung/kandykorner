import React, { useEffect, useState } from "react";
import { getAllProductsExpandProductType, getPurchasesProductsByCustomer } from "../ApiManager";

export const MyOrders = () => {
    const [products, updateProducts] = useState([]);
    const [myPurchasesProducts, updatePurchasesProducts] = useState([])

    const getProducts = () => {
        return getAllProductsExpandProductType()
            .then(products => updateProducts(products))
    }

    const getMyPurchasesProducts = () => {
        return getPurchasesProductsByCustomer()
        .then(data => {
            const myPurchasesProducts = [];
            data.forEach(purchases => {
                purchases.purchasesProducts.forEach(pp => myPurchasesProducts.push(pp))
            })
            updatePurchasesProducts(myPurchasesProducts)
        
        })
    }

    useEffect(() => {
        getProducts()
        getMyPurchasesProducts()
    }, []);

    const myProducts = products.filter(product => {
        return myPurchasesProducts.find(mypp => product.id === mypp.productId)
    })

    return (
        <>
            <h1>My Orders</h1>
            <div className="products">
                {myProducts.map( product => {
                    return <div key={`product--${product.id}`}>
                        <h3>{product.brand} {product.name} - {product.weight}</h3>
                        <p>{product.price.toLocaleString("en-US", {style:"currency", currency:"USD"})}</p>
                    </div>
                })}
            </div> 
        </>
    )
}


