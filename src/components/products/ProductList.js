import React, { useEffect, useState } from "react"
import { getAllProductsExpandProductType, postProduct, postPurchase } from "../ApiManager";

export const ProductList = () => {
    const [products, updateProducts] = useState([]);
    const [cartItems, updateCart] = useState([]);

    const getProducts = () => {
        return getAllProductsExpandProductType()
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

        postPurchase(newPurchase)
            .then(
                (purchaseObj) => {
                    const promisesArray = [];
                    cartItems.forEach( item => {
                        const newPurchaseProduct = {
                            productId: item.id,
                            purchaseId: purchaseObj.id
                        }
                        
                        promisesArray.push(postProduct(newPurchaseProduct))
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