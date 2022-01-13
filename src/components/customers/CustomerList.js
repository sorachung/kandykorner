import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAllCustomers } from "../ApiManager";

export const CustomerList = () => {
    const [customers, updateCustomers] = useState([]);

    useEffect(
        () => {
            getAllCustomers()
                .then( (customersData) => updateCustomers(customersData));
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
                    </div>
                })}
            </div>  
        </>
    )
}