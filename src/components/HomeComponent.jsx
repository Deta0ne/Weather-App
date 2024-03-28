import React from 'react';

export const HomeComponent = ({ currentWeather, forecast }) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date().toLocaleDateString('en-US', options);

    return (
        <div className="container w-[23rem] h-[50rem] bg-search-bg bg-center grid justify-center content-start">
            {currentWeather && (
                <div className="w-[22rem] h-80 bg-gray-800 mt-1 rounded-md">
                    <div
                        className={`bg-${currentWeather.data.weather[0].icon} bg-center m-2 w-[21rem] h-[19rem] rounded-md p-4 grid content-between`}
                    >
                        <div>
                            <p className="font-nunito text-heading-sm text-white">
                                {currentWeather.data.name}, {currentWeather.data.sys.country}
                            </p>
                            <p className="font-nunito text-text-xs text-gray-100">{today}</p>
                        </div>
                        <div className="flex justify-between">
                            <div className="grid content-end mb-5">
                                <p className="font-nunito text-heading-xl text-white">
                                    {Math.round(currentWeather.data.main.temp)}°C
                                </p>
                                <p className="font-nunito text-heading-sm text-white">
                                    {Math.round(currentWeather.data.main.temp_min)}°c/
                                    {Math.round(currentWeather.data.main.temp_max)}°c
                                </p>
                                <p className="font-nunito text-text-sm text-white">
                                    {currentWeather.data.weather[0].description.charAt(0).toUpperCase() +
                                        currentWeather.data.weather[0].description.slice(1)}
                                </p>
                            </div>
                            <div>
                                <img src={`../../src/assets/İcons/${currentWeather.data.weather[0].icon}.svg`} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
