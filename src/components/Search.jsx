import { useState, useEffect, useCallback } from 'react';
import { GEO_API_URL, GEO_API_KEY } from '../api';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

const Search = ({
    handleOnSearchClick,
    isSearching,
    setIsSearching,
    hasSearched,
    setHasSearched,
    error,
    setError,
    setLang,
    lang,
}) => {
    Search.propTypes = {
        handleOnSearchClick: PropTypes.func.isRequired,
        isSearching: PropTypes.bool.isRequired,
        setIsSearching: PropTypes.func.isRequired,
        hasSearched: PropTypes.bool.isRequired,
        setHasSearched: PropTypes.func.isRequired,
        error: PropTypes.string,
        setError: PropTypes.func.isRequired,
        setLang: PropTypes.func.isRequired,
        lang: PropTypes.string.isRequired,
    };

    const [suggestions, setSuggestions] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [term, setTerm] = useState('');
    const [cancelToken, setCancelToken] = useState(null);
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
        setLang(lng);
        i18n.changeLanguage(lng);
    };

    useEffect(() => {
        return () => {
            if (cancelToken) {
                cancelToken.cancel(t('fetchCityError1'));
            }
        };
    }, [cancelToken]);

    const debouncedFetchCities = useCallback(
        debounce((searchTerm) => {
            fetchCities(searchTerm);
        }, 500),
        [],
    );

    const fetchCities = async (searchTerm) => {
        setIsSearching(true);
        setTerm(searchTerm);
        if (cancelToken) {
            cancelToken.cancel(t('fetchCityError1'));
        }
        const newCancelToken = axios.CancelToken.source();
        setCancelToken(newCancelToken);

        try {
            const response = await axios({
                method: 'GET',
                url: `${GEO_API_URL}/cities?namePrefix=${searchTerm}`,
                params: {
                    istanceUnit: 'KM',
                    types: 'CITY',
                    minPopulation: '30000',
                    limit: '3',
                    sort: 'population,name',
                },
                headers: {
                    'X-RapidAPI-Key': GEO_API_KEY,
                    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
                },
                cancelToken: newCancelToken.token,
            });

            setSuggestions(response.data.data);
        } catch (error) {
            if (axios.isCancel(error)) {
                setError(t('fetchCityError2'));
            } else if (error.response.status === 403) {
                setError(t('fetchCityError3'));
            } else if (error.response.status === 429) {
                setError(t('fetchCityError4'));
            } else {
                setError(t('fetchCityError5'));
            }
        } finally {
            setIsSearching(false);
        }
    };

    const handleSelectCity = (city) => {
        setSelectedCity(city);
        setSuggestions([]);
        setTerm(city.name);
        setHasSearched(false);
    };

    const handleOnSearchChange = (e) => {
        const searchTerm = e.target.value;
        setTerm(searchTerm);
        setSuggestions([]);
        debouncedFetchCities(searchTerm);
    };

    return (
        <div className="container w-auto sm:w-96 h-[100vh] bg-search-bg bg-center grid justify-center content-start">
            <img src="/logo/logo.svg" alt="logo" className="justify-self-center pt-6" />
            <div className="flex justify-center gap-2 pt-2 pr-2">
                <button
                    disabled={lang === 'en'}
                    className="text-gray-200 font-nunito text-text-sm  disabled:opacity-50 "
                    onClick={() => changeLanguage('en')}
                >
                    EN
                </button>
                <button
                    disabled={lang === 'tr'}
                    className="text-gray-200 font-nunito text-text-sm  disabled:opacity-50"
                    onClick={() => changeLanguage('tr')}
                >
                    TR
                </button>
            </div>
            <div className="py-[15rem]">
                <div className="flex flex-col pb-4 items-center">
                    <p className="text-heading-md font-nunito text-white ">
                        {t('welcome')} <span className="text-blue-light">TypeWeather</span>
                    </p>
                    <p className="font-nunito text-text-sm text-gray-200">{t('descriptionSearch')}</p>
                </div>
                {error && (
                    <div className=" pb-4 items-center max-w-72 text-gray-100 font-nunito text-text-sm">
                        <span style={{ color: 'red' }} className="text-red-400">
                            {t('error')}:
                        </span>
                        {error}
                    </div>
                )}
                <div className="flex flex-col items-center">
                    <div>
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            className="w-72 h-12 rounded-lg text-gray-400 bg-gray-800 pl-4 focus:outline-none"
                            value={term}
                            onChange={handleOnSearchChange}
                        />
                        {isSearching && (
                            <svg
                                className="animate-spin h-5 w-5 text-gray-500 absolute right-3 top-3"
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M17 4V8C17 8.26522 16.8946 8.51957 16.7071 8.70711C16.5196 8.89464 16.2652 9 16 9C15.7348 9 15.4804 8.89464 15.2929 8.70711C15.1054 8.51957 15 8.26522 15 8V4C15 3.73478 15.1054 3.48043 15.2929 3.29289C15.4804 3.10536 15.7348 3 16 3C16.2652 3 16.5196 3.10536 16.7071 3.29289C16.8946 3.48043 17 3.73478 17 4ZM28 15H24C23.7348 15 23.4804 15.1054 23.2929 15.2929C23.1054 15.4804 23 15.7348 23 16C23 16.2652 23.1054 16.5196 23.2929 16.7071C23.4804 16.8946 23.7348 17 24 17H28C28.2652 17 28.5196 16.8946 28.7071 16.7071C28.8946 16.5196 29 16.2652 29 16C29 15.7348 28.8946 15.4804 28.7071 15.2929C28.5196 15.1054 28.2652 15 28 15ZM22.3638 20.95C22.1747 20.7704 21.9229 20.6717 21.6622 20.6751C21.4014 20.6784 21.1523 20.7835 20.9679 20.9679C20.7835 21.1523 20.6784 21.4014 20.6751 21.6622C20.6717 21.9229 20.7704 22.1747 20.95 22.3638L23.7775 25.1925C23.9651 25.3801 24.2196 25.4856 24.485 25.4856C24.7504 25.4856 25.0049 25.3801 25.1925 25.1925C25.3801 25.0049 25.4856 24.7504 25.4856 24.485C25.4856 24.2196 25.3801 23.9651 25.1925 23.7775L22.3638 20.95ZM16 23C15.7348 23 15.4804 23.1054 15.2929 23.2929C15.1054 23.4804 15 23.7348 15 24V28C15 28.2652 15.1054 28.5196 15.2929 28.7071C15.4804 28.8946 15.7348 29 16 29C16.2652 29 16.5196 28.8946 16.7071 28.7071C16.8946 28.5196 17 28.2652 17 28V24C17 23.7348 16.8946 23.4804 16.7071 23.2929C16.5196 23.1054 16.2652 23 16 23ZM9.63625 20.95L6.8075 23.7775C6.61986 23.9651 6.51444 24.2196 6.51444 24.485C6.51444 24.7504 6.61986 25.0049 6.8075 25.1925C6.99514 25.3801 7.24964 25.4856 7.515 25.4856C7.78036 25.4856 8.03486 25.3801 8.2225 25.1925L11.05 22.3638C11.2296 22.1747 11.3283 21.9229 11.3249 21.6622C11.3216 21.4014 11.2165 21.1523 11.0321 20.9679C10.8477 20.7835 10.5986 20.6784 10.3378 20.6751C10.0771 20.6717 9.82531 20.7704 9.63625 20.95ZM9 16C9 15.7348 8.89464 15.4804 8.70711 15.2929C8.51957 15.1054 8.26522 15 8 15H4C3.73478 15 3.48043 15.1054 3.29289 15.2929C3.10536 15.4804 3 15.7348 3 16C3 16.2652 3.10536 16.5196 3.29289 16.7071C3.48043 16.8946 3.73478 17 4 17H8C8.26522 17 8.51957 16.8946 8.70711 16.7071C8.89464 16.5196 9 16.2652 9 16ZM8.2225 6.8075C8.03486 6.61986 7.78036 6.51444 7.515 6.51444C7.24964 6.51444 6.99514 6.61986 6.8075 6.8075C6.61986 6.99514 6.51444 7.24964 6.51444 7.515C6.51444 7.78036 6.61986 8.03486 6.8075 8.2225L9.63625 11.05C9.82531 11.2296 10.0771 11.3283 10.3378 11.3249C10.5986 11.3216 10.8477 11.2165 11.0321 11.0321C11.2165 10.8477 11.3216 10.5986 11.3249 10.3378C11.3283 10.0771 11.2296 9.82531 11.05 9.63625L8.2225 6.8075Z"
                                    fill="white"
                                />
                            </svg>
                        )}
                        <ul className="text-gray-100  rounded-md  mt-2 bg-gray-500 divide-y divide-gray-900 max-w-72">
                            {suggestions.map((city) => (
                                <li
                                    key={`${city.id}-${city.name}`}
                                    className="cursor-pointer hover:bg-gray-700  p-3"
                                    onClick={() => handleSelectCity(city)}
                                >
                                    {city.name}, {city.countryCode} - {city.country}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button
                        className="disabled:cursor-not-allowed w-72 h-12 bg-blue-light text-black font-nunito text-text-md mt-4 rounded-lg hover:bg-gray-500 hover:text-white transition ease-in-out delay-100"
                        onClick={() => {
                            if (selectedCity) {
                                handleOnSearchClick(selectedCity);
                            } else {
                                alert('Please select a city from the suggestions.');
                            }
                        }}
                        disabled={isSearching}
                    >
                        {t('search')}
                    </button>

                    {hasSearched && (
                        <button
                            className="sm:invisible animate-bounce h-12 flex w-auto content-center items-center p-2 self-center gap-1 bg-blue-light text-black font-nunito text-text-md mt-5 rounded-lg hover:bg-gray-500 hover:text-white transition ease-in-out delay-100"
                            onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
                            disabled={isSearching}
                        >
                            <img src="/İcons/down.svg" alt="" className="w-6 h-12 " />
                            {t('goToWeather')}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;
