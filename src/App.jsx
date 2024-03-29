import './App.css';
import Search from './components/Search';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { WEATHER_API_KEY, WEATHER_API_URL, UV_API_KEY, UV_API_URL } from './api';
import { HomeComponent } from './components/HomeComponent';
import { useGeolocated } from 'react-geolocated';

function App() {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [currentUV, setCurrentUV] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (currentWeather) {
            getUVIndex();
        }
    }, [currentWeather]);

    const getUVIndex = async () => {
        if (!currentWeather || !currentWeather.data.coord) return;
        try {
            const { lat, lon } = currentWeather.data.coord;
            const response = await axios.get(`${UV_API_URL}/uv`, {
                params: { lat, lng: lon },
                headers: {
                    'x-access-token': UV_API_KEY,
                },
            });
            setCurrentUV(response.data.result);
            response.status === 200 && setError(null);
        } catch (error) {
            if (error.response.status === 400) {
                setError('No UV data');
                setCurrentUV({ uv: 'No UV data' });
            } else if (error.response.status === 403) {
                setError('UV Index API key is invalid.');
            } else if (error.response.status === 429) {
                setError('Daily UV Index API quota exceeded.');
                setCurrentUV({ uv: 'No UV data' });
            }
        } finally {
            setIsSearching(false);
        }
    };

    //GeoLocation
    const { coords } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
    });
    useEffect(() => {
        if (coords) {
            setHasSearched(false);
            setIsSearching(true);
            handleOnSearchClick({ latitude: coords.latitude, longitude: coords.longitude });
        }
    }, [coords]);

    const handleOnSearchClick = async (selectedCity) => {
        setIsSearching(true);
        try {
            if (!hasSearched) {
                const weatherResponse = await axios.get(`${WEATHER_API_URL}/weather`, {
                    params: {
                        lat: selectedCity.latitude,
                        lon: selectedCity.longitude,
                        appid: WEATHER_API_KEY,
                        units: 'metric',
                    },
                });
                setCurrentWeather(weatherResponse);
                const forecastResponse = await axios.get(`${WEATHER_API_URL}/forecast`, {
                    params: {
                        lat: selectedCity.latitude,
                        lon: selectedCity.longitude,
                        appid: WEATHER_API_KEY,
                        units: 'metric',
                    },
                });
                setForecast(forecastResponse);
                weatherResponse && setHasSearched(true);
            } else {
                alert('You have already searched this city. Please search for another city.');
            }
        } catch (error) {
            if (error.response.status === 429) {
                setError('Too many search requests. Please try again later.');
            } else if (error.response.status === 401) {
                setError('OpenWeather API key is invalid.');
            } else {
                setError('An error occurred while searching for the city.');
            }
        } finally {
            setIsSearching(false);
        }
    };
    return (
        <div className="flex justify-center bg-gray-800">
            <Search
                handleOnSearchClick={handleOnSearchClick}
                isSearching={isSearching}
                setIsSearching={setIsSearching}
                hasSearched={hasSearched}
                setHasSearched={setHasSearched}
                error={error}
                setError={setError}
            />
            {currentWeather && forecast && (
                <HomeComponent
                    currentWeather={currentWeather}
                    forecast={forecast}
                    currentUV={currentUV ? currentUV : 'No data'}
                />
            )}
        </div>
    );
}

export default App;
