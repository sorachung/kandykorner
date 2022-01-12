import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const CustomerList = () => {
    const [customers, updateCustomers] = useState([]);

    useEffect(
        () => {
            fetch("http://localhost:8088/customers")
                .then(response => response.json())
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