import './App.css';
import Search from './components/Search';
import { useState, useEffect } from 'react';
import { WeatherCard } from './components//WeatherCard';
import { WeatherDetails } from './components/WeatherDetails';
import { WeatherNextDays } from './components/WeatherNextDays';
import { useGeolocated } from 'react-geolocated';
import { fetchCurrentWeather, fetchForecast } from './services/weatherService';
import { fetchUVIndex } from './services/uvService';

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
            const response = await fetchUVIndex(lat, lon);
            setCurrentUV(response.data.result);
            response.status === 200 && setError(null);
        } catch (error) {
            if (error.response.status === 400) {
                setError('No UV data');
                setCurrentUV({ uv: 'No UV data' });
            } else if (error.response.data.error.length > 34 && error.response.status === 403) {
                setError('Daily API quota exceeded, UV Index Api');
                setCurrentUV({ uv: 'No UV data' });
            } else if (error.response.data.error.length < 34 && error.response.status === 403) {
                setError('User with API Key not found, UV Index Api');
                setCurrentUV({ uv: 'No UV data' });
            } else {
                setError('An error occurred while searching for the UV index API.');
            }
        } finally {
            setIsSearching(false);
        }
    };

    const handleOnSearchClick = async (selectedCity) => {
        setIsSearching(true);
        try {
            if (!hasSearched) {
                const weatherResponse = await fetchCurrentWeather(selectedCity.latitude, selectedCity.longitude);
                setCurrentWeather(weatherResponse);
                const forecastResponse = await fetchForecast(selectedCity.latitude, selectedCity.longitude);
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

    //GeoLocation
    const { coords } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
    });
    useEffect(() => {
        if (coords) {
            setIsSearching(true);
            setHasSearched(false);
            handleOnSearchClick({ latitude: coords.latitude, longitude: coords.longitude });
        }
    }, [coords]);
    return (
        <div className="sm:flex justify-center bg-gray-800 pb-2 sm:pb-0">
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
                <div className="container w-auto sm:w-96  bg-search-bg bg-center grid justify-center content-start gap-1">
                    <WeatherCard weatherData={currentWeather.data} />
                    <WeatherDetails
                        currentWeather={currentWeather}
                        forecast={forecast}
                        uvIndex={currentUV ? currentUV : 'No data'}
                    />
                    <WeatherNextDays forecastData={forecast.data} />
                </div>
            )}
        </div>
    );
}

export default App;
