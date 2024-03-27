import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [term, setterm] = useState(null);

    const fetchCities = async (searchTerm) => {
        try {
            const response = await axios({
                method: 'GET',
                url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${searchTerm}&limit=3`,
                headers: {
                    'X-RapidAPI-Key': 'd6bcaed461msh5cce96a5fd5a4aap114f42jsn2f112ee15ee8',
                    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
                },
            });
            setSuggestions(response.data.data.slice(0, 3));
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    const handleSelectCity = (city) => {
        setSelectedCity(city);
        setSuggestions([]);
        setterm(city.name);
    };

    return (
        <div className="container w-96 h-[50rem] bg-search-bg bg-center grid justify-center content-start">
            <img src="../../src/assets/logo/logo.svg" alt="logo" className="justify-self-center pt-6" />
            <div className="py-[10rem]">
                <div className="flex flex-col pb-4 items-center">
                    <p className="text-heading-md font-nunito text-white ">
                        Welcome to <span className="text-blue-light">TypeWeather</span>
                    </p>
                    <p className="font-nunito text-text-sm text-gray-200">
                        Choose a location to see the weather forecast
                    </p>
                </div>
                <div className="flex flex-col ">
                    <input
                        type="text"
                        placeholder="Search location"
                        className="w-72 h-12 rounded-lg text-gray-400 bg-gray-800 pl-4 focus:outline-none"
                        onChange={(e) => {
                            fetchCities(e.target.value);
                            setterm(e.target.value);
                        }}
                    />
                    <ul className="text-white">
                        {suggestions.map((city) => (
                            <li
                                key={city.id}
                                className="cursor-pointer hover:bg-gray-700"
                                onClick={() => handleSelectCity(city)}
                            >
                                {city.name}
                            </li>
                        ))}
                    </ul>
                    <button className="w-72 h-12 bg-blue-light text-white font-nunito text-text-md mt-4 rounded-lg">
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Search;
