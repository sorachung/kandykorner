export const getCustomerByEmail = (email) => {
    return fetch(`http://localhost:8088/customers?email=${email}`)
        .then(res => res.json())
}

export const postCustomer = (customer) => {
    return fetch("http://localhost:8088/customers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
    })
        .then(res => res.json())
}

export const getAllCustomersWithPurchases = () => {
    return fetch("http://localhost:8088/customers?_embed=purchases")
                .then(response => response.json())
}

export const getAllEmployeesExpandLocation = () => {
    return fetch("http://localhost:8088/employees?_expand=location")
        .then(response => response.json())
}

export const deleteEmployee = (employeeId) => {
    return fetch(`http://localhost:8088/employees/${employeeId}`, {method: "DELETE"})
}

export const getAllLocations = () => {
    return fetch("http://localhost:8088/locations")
        .then(response => response.json())
}

export const postEmployee = (newEmployee) => {
    const fetchOption = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newEmployee)
    }

    return fetch("http://localhost:8088/employees", fetchOption)
}

export const getAllProductsExpandProductType = () => {
    return fetch("http://localhost:8088/products?_expand=productType&_sort=productType.category&_order=asc")
    .then(response => response.json())
}

export const postPurchase = (newPurchase) => {
    const fetchOption = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPurchase)
    }

    return fetch(`http://localhost:8088/purchases`, fetchOption)
    .then(res => res.json())
}

export const postProduct = (newPurchaseProduct) => {
    const fetchOption = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPurchaseProduct)
    }

    return fetch(`http://localhost:8088/purchasesProducts`, fetchOption)
}


export const getPurchasesProductsByCustomer = () => {
    return fetch (`http://localhost:8088/purchases?_embed=purchasesProducts&customerId=${localStorage.getItem("kandy_customer")}`)
        .then(res => res.json())
}