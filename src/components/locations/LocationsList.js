import React, { useEffect, useState } from "react"

export const LocationsList = () => {
    const [locations, updateLocations] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8088/locations")
            .then(response => response.json())
            .then(locations => updateLocations(locations))
        
    }, []);

    return (
        <>
            {locations.map(location => {
                return <div key={`location--${location.id}`}>
                        <p>{location.addressStreet}</p>
                        <p>{location.addressCity}, {location.addressState} {location.addressZipCode}</p>
                    </div>
            })}
        </>
    );
}