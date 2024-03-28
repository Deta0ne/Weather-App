import './App.css';
import Search from './components/Search';
import { useState } from 'react';
import axios from 'axios';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import { HomeComponent } from './components/HomeComponent';

function App() {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [isSearching, setIsSearching] = useState(false);

    const handleOnSearchClick = async (selectedCity) => {
        setIsSearching(true);
        try {
            const response = await axios({
                method: 'GET',
                url: `${WEATHER_API_URL}/weather?q=${selectedCity.name}&appid=${WEATHER_API_KEY}&units=metric`,
            });
            setCurrentWeather(response);
            console.log('Weather:', currentWeather);

            const forecastResponse = await axios({
                method: 'GET',
                url: `${WEATHER_API_URL}/forecast?q=${selectedCity.name}&appid=${WEATHER_API_KEY}&units=metric`,
            });
            setForecast(forecastResponse);
            console.log('forecast:', forecast);
        } catch (error) {
            console.error('Error fetching weather:', error);
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className="flex">
            <Search
                handleOnSearchClick={handleOnSearchClick}
                isSearching={isSearching}
                setIsSearching={setIsSearching}
            />
            <HomeComponent currentWeather={currentWeather} forecast={forecast} />
        </div>
    );
}

export default App;
