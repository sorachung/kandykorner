import React, { useEffect, useState } from "react"

export const ProductList = () => {
    const [products, updateProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8088/products")
            .then(response => response.json())
            .then(products => updateProducts(products))
        
    }, []);

    return (
        <>
            {products.map(product => {
                return <div key={`product--${product.id}`}>
                        <h3>{product.brand} {product.name} - {product.weight}</h3>
                        <p>{product.price.toLocaleString("en-US", {style:"currency", currency:"USD"})}</p>
                        <p>{product.productTypeId}</p>
                    </div>
            })}
        </>
    );
}