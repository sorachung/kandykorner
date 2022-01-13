import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getCustomerByEmail, postCustomer } from "../ApiManager";
import "./Login.css";

export const Register = () => {
    const [customer, setCustomer] = useState({});
    const conflictDialog = useRef();

    const history = useHistory();

    const existingUserCheck = () => {
        return getCustomerByEmail(customer.email)
            .then(user => !!user.length)
    }

    const handleRegister = (e) => {
        e.preventDefault();
        existingUserCheck()
            .then(userExists => {
                if (!userExists) {
                    postCustomer(customer)
                        .then(createdUser => {
                            if(createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("kandy_customer", createdUser.id)
                                history.push("/")
                            }
                        })
                } else {
                    conflictDialog.current.showModal();
                }
            })
    }

    const updateCustomer = (evt) => {
        const copy = { ...customer };
        copy[evt.target.id] = evt.target.value;
        setCustomer(copy);
    }

return (
        <main style={{textAlign: "center" }}>
            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register for Kandy Korner</h1>
                <fieldset>
                    <label htmlFor="name">Full Name </label>
                    <input onChange={updateCustomer}
                        type="text" id="name" className="form-control"
                        placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateCustomer} type="email" id="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}