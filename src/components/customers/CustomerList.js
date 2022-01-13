import React, { useEffect, useState } from "react";
import { getAllCustomersWithPurchases } from "../ApiManager";

export const CustomerList = () => {
    const [customers, updateCustomers] = useState([]);

    useEffect(
        () => {
            getAllCustomersWithPurchases()
                .then( (customersData) => {
                    customersData.sort((a,b) => b.purchases.length - a.purchases.length)
                    updateCustomers(customersData)
                
                });
        },
        []
    )



    return (
        <>
          <div className="customers__list">
                {customers.map(customer => {
                    return <div className="customer" key={`customer--${customer.id}`}>
                        <h2 className="customer__name">{customer.name}</h2>
                        <div className="customer__email">
                            <p>{customer.email}</p>
                        </div>
                        <p>Candies bought: {customer.purchases.length}</p>
                    </div>
                })}
            </div>  
        </>
    )
}