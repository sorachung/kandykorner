import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const EmployeeList = () => {
    const [employees, updateEmployees] = useState([]);
    const history = useHistory();

    useEffect(
        () => {
            fetch("http://localhost:8088/employees?_expand=location")
                .then(response => response.json())
                .then(employeesData => updateEmployees(employeesData));
        },
        []
    )
    
    return (
        <>
            <div>  
                <button onClick={() => history.push("/employees/hire")}>Hire Employee</button>   
            </div>            
            <div>
                {employees.map(employee => {
                    return <p key={`employee--${employee.id}`}>{employee.name}</p>
                })}
            </div>
        </>
    )
}