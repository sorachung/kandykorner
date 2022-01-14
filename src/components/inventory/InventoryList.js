import React, { useEffect, useState } from "react"
import { getAllProductsExpandProductType, postProduct, postPurchase } from "../ApiManager";
import { useHistory } from "react-router-dom";

export const InventoryList = (props) => {
    const [searchedInventory, updateSearchedInventory] = useState([])
    const [inventory, updateInventory] = useState([]);
    const [cartItems, updateCart] = useState([]);

    const getInventory = () => {
        return getAllProductsExpandProductType()
            .then(products => {
                updateInventory(products)
                updateSearchedInventory(products)
            })
    }

    useEffect( () => {
        getInventory()
    },[])

    useEffect(() => {
        const processedSearchText = props.searchText.toLowerCase().trim();
        const filteredInventory = inventory.filter(product => {
            if(processedSearchText === "") {
                return true;
            }
            return (product.name.toLowerCase().includes(processedSearchText) || product.brand.toLowerCase().includes(processedSearchText))
        })
        updateSearchedInventory(filteredInventory)
    },[props.searchText])
    
    const history = useHistory();

    const addToCart = (event) => {
        const productId = parseInt(event.target.value);
        
        const newItemToAdd = inventory.find(product => productId === product.id)
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
            history.push("/myorders")
        })
    }

        

    return (
        <>
            <div className="products">
                {searchedInventory.map(product => {
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