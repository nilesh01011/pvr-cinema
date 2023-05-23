import { createContext, useState } from 'react';

const Place = createContext();

const PlaceContext = ({ children }) => {
    const [selectedCity, setSelectedCity] = useState('')
    return (
        <Place.Provider value={{ selectedCity, setSelectedCity }}>
            {children}
        </Place.Provider>
    )
}

export { PlaceContext, Place }