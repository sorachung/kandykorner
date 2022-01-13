import React, { useEffect, useState } from "react"

export const ProductList = () => {
    const [products, updateProducts] = useState([]);
    const [cartItems, updateCart] = useState([]);

    const getProducts = () => {
        return fetch("http://localhost:8088/products?_expand=productType&_sort=productType.category&_order=asc")
            .then(response => response.json())
            .then(products => updateProducts(products))
    }

    useEffect(() => {
        getProducts();
    }, []);

    const addToCart = (event) => {
        const productId = parseInt(event.target.value);
        
        const newItemToAdd = products.find(product => productId === product.id)
        const copyOfCartItems = cartItems.map(item => ({...item}))
        copyOfCartItems.push(newItemToAdd)
        // console.log(copyOfCartItems.)
        updateCart(copyOfCartItems);
    }

    const removeFromCart = (event) => {
        const productId = parseInt(event.target.value);
        const copyOfCartItems = cartItems.map(item => ({...item}))
        const productIndex = copyOfCartItems.map(item => item.id).indexOf(productId);
        copyOfCartItems.splice(productIndex, 1);
        updateCart(copyOfCartItems)
    }

    const purchaseProducts = (event) => {
        const copyOfCartItems = cartItems.map(item => ({...item}))
        updateCart(copyOfCartItems)
        const newPurchase = {
            customerId: parseInt(localStorage.getItem("kandy_customer")),
            employeeId: 8
        };

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPurchase)
        }
        
        fetch(`http://localhost:8088/purchases`, fetchOption)
            .then(res => res.json())
            .then(
                (purchaseObj) => {
                    const promisesArray = [];
                    cartItems.forEach( item => {
                        const newPurchaseProduct = {
                            productId: item.id,
                            purchaseId: purchaseObj.id
                        }
                        const fetchOption2 = {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(newPurchaseProduct)
                        }
            
                        promisesArray.push(fetch(`http://localhost:8088/purchasesProducts`, fetchOption2))
                })
                return Promise.all(promisesArray)
        }).then( () => {
            updateCart([])
        })
    }

    return (
        <>
            <div className="products">
                {products.map(product => {
                    return <div key={`product--${product.id}`}>
                            <h3>{product.brand} {product.name} - {product.weight}</h3>
                            <p>{product.price.toLocaleString("en-US", {style:"currency", currency:"USD"})}</p>
                            <p>{product.productType.category}</p>
                            <div className="product__addToCart">
                                {cartItems.find(item => item.id === product.id) ? 
                                <button className="product__removeFromCart--btn btn" value={product.id} onClick={removeFromCart}>Remove from cart</button> 
                                : <button className="product__addToCart--btn btn" value={product.id} onClick={addToCart}>Add to cart</button>
                                }
                            </div>
                        </div>
                })}
            </div>
            <div className="cart">
                Items in cart: {cartItems.length > 0 ? cartItems.map(item => `${item.brand} ${item.name}`).join(", ") : cartItems.length}
                
            </div>
            <div className="purchase">
                <button className="purchase--btn btn" onClick={purchaseProducts}>
                    Purchase
                </button>

            </div>

        </>
    );
}