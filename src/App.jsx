import './App.css';
import Search from './components/Search';
import { useState, useEffect } from 'react';
import { WeatherCard } from './components//WeatherCard';
import { WeatherDetails } from './components/WeatherDetails';
import { WeatherNextDays } from './components/WeatherNextDays';
import { useGeolocated } from 'react-geolocated';
import { fetchCurrentWeather, fetchForecast } from './services/weatherService';
import { fetchUVIndex } from './services/uvService';
import { useTranslation } from 'react-i18next';

function App() {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [currentUV, setCurrentUV] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [error, setError] = useState(null);
    const [lang, setLang] = useState('en');
    const { t } = useTranslation();

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
                setError(t('uvError1'));
                setCurrentUV({ uv: t('uvError1') });
            } else if (error.response.data.error.length > 34 && error.response.status === 403) {
                setError(t('uvError2'));
                setCurrentUV({ uv: t('uvError1') });
            } else if (error.response.data.error.length < 34 && error.response.status === 403) {
                setError(t('uvError3'));
                setCurrentUV({ uv: t('uvError1') });
            } else {
                setError(t('uvError4'));
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
                alert(t('searchError1'));
            }
        } catch (error) {
            if (error.response.status === 429) {
                setError(t('searchError2'));
            } else if (error.response.status === 401) {
                setError(t('searchError3'));
            } else {
                setError(t('searchError4'));
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
                setLang={setLang}
                lang={lang}
            />
            {currentWeather && forecast && (
                <div className="container w-auto sm:w-96  bg-search-bg bg-center grid justify-center content-start gap-1">
                    <WeatherCard weatherData={currentWeather.data} lang={lang} />
                    <WeatherDetails
                        currentWeather={currentWeather}
                        forecast={forecast}
                        uvIndex={currentUV ? currentUV : t('uvError1')}
                    />
                    <WeatherNextDays forecastData={forecast.data} lang={lang} />
                </div>
            )}
        </div>
    );
}

export default App;
