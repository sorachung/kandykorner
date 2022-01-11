import React, { useEffect, useState } from "react";

export const EmployeeList = () => {
    const [employees, updateEmployees] = useState([]);

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
                {employees.map(employee => {
                    return <p key={`employee--${employee.id}`}>{employee.name}</p>
                })}
            </div>
        </>
    )
}