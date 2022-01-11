import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const EmployeeForm = () => {
    const [employee, updateEmployee] = useState({
        name: "",
        hourlyRate: 0,
        fullTime: false,
        isManager: false,
        locationId: 0
    })

    const [locations, updateLocations] = useState([])

    useEffect(() => {
        fetch("http://localhost:8088/locations")
            .then(response => response.json())
            .then(locations => updateLocations(locations))
        
    }, []);

    const history = useHistory();

    const saveEmployee = (event) => {
        event.preventDefault();

        const newEmployee = {
            name: employee.name,
            hourlyRate: employee.hourlyRate,
            fullTime: employee.fullTime,
            isManager: employee.isManager,
            locationId: employee.locationId
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEmployee)
        }

        return fetch("http://localhost:8088/employees", fetchOption)
            .then(() => history.push("/employees"))
    }

    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Full Name"
                        onChange={(event) => {
                            const copyOfEmployee = { ...employee };
                            copyOfEmployee.name = event.target.value;
                            updateEmployee(copyOfEmployee);

                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <select name="location" className="form-control" onChange={(event) => {
                        const copyOfEmployee = { ...employee };
                        copyOfEmployee.locationId = parseInt(event.target.value);
                        updateEmployee(copyOfEmployee);
                    }}>
                        <option value="0">Select a location</option>
                        {locations.map(location => {
                            return <option key={location.id} value={location.id}>{location.addressStreet}, {location.addressCity}</option>
                        })}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="isManager">Manager</label>
                    <input type="checkbox"
                        onChange={(event) => {
                            const copyOfEmployee = { ...employee };
                            copyOfEmployee.isManager = event.target.checked;
                            updateEmployee(copyOfEmployee);
                        }}
                        />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="fullTime">Full Time</label>
                    <input type="checkbox"
                        onChange={(event) => {
                            const copyOfEmployee = { ...employee };
                            copyOfEmployee.fullTime = event.target.checked;
                            updateEmployee(copyOfEmployee);
                        }}
                        />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="hourlyRate">Hourly Rate</label>
                    <input 
                        required autoFocus
                        type="number"
                        min="7.50"
                        step="0.01"
                        className="form-control"
                        placeholder="7.50"
                        onChange={(event) => {
                            const copyOfEmployee = { ...employee };
                            copyOfEmployee.hourlyRate = parseInt(event.target.value);
                            updateEmployee(copyOfEmployee);

                        }}
                    />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={saveEmployee}>Hire Employee</button>
        </form>
    )
}