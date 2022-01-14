import React, {useState} from "react";

export const InventorySearch = (props) => {

    return (
        <form className="inventorySearch">
            <h2 className="inventorySearch__title">Search our inventory:</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="search">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        name="search"
                        placeholder="Dum Dums lollipops"
                        onChange={ (event) => {
                            props.updateSearchText(event.target.value);
                            }
                        } />
                </div>
            </fieldset>
        </form>
    )
}