import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { deleteEmployee, getAllEmployeesExpandLocation } from "../ApiManager";

export const EmployeeList = () => {
    const [employees, updateEmployees] = useState([]);
    const history = useHistory();

    const getEmployees = () => {
        return getAllEmployeesExpandLocation()
            .then(employeesData => updateEmployees(employeesData));
    }

    useEffect(
        () => {
            getEmployees()
        },
        []
    )

    const fireEmployee = (event) => {
        const employeeId = parseInt(event.target.value);
        return deleteEmployee(employeeId)
            .then( () => {
                getEmployees()
            })
    }
    
    return (
        <>
            <div>  
                <button onClick={() => history.push("/employees/hire")}>Hire Employee</button>   
            </div>            
            <div className="employees__list">
                {employees.map(employee => {
                    return <div className="employee" key={`employee--${employee.id}`}>
                        <h2 className="employee__name">{employee.name}</h2>
                        <div className="employee__fire">
                            <button className="employee__fire--btn btn" value={employee.id} onClick={fireEmployee}>
                                Fire Employee
                            </button>
                        </div>
                        <div className="employee__location">
                            <p>{employee.location.addressStreet}</p>
                            <p>{employee.location.addressCity}, {employee.location.addressState} {employee.location.addressZipCode}</p>
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}