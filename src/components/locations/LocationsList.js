import React, { useEffect, useState } from "react"
import { getAllLocations } from "../ApiManager";

export const LocationsList = () => {
    const [locations, updateLocations] = useState([]);

    useEffect(() => {
        getAllLocations()
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