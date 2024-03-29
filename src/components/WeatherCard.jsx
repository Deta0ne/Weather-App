import PropTypes from 'prop-types';

export const WeatherCard = ({ weatherData }) => {
    WeatherCard.propTypes = {
        weatherData: PropTypes.object,
    };

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date().toLocaleDateString('en-US', options);

    return (
        <div className="w-[22rem] h-[21rem] bg-gray-800 mt-1 rounded-md">
            <div
                style={{
                    backgroundImage: `url('/images/${weatherData.weather[0].icon}.png')`,
                }}
                className="bg-center m-2 w-[21rem] h-[20rem] rounded-md p-4 grid content-between"
            >
                <div>
                    <p className="font-nunito text-heading-sm text-white">
                        {weatherData.name}, {weatherData.sys.country}
                    </p>
                    <p className="font-nunito text-text-xs text-gray-100">{today}</p>
                </div>
                <div className="flex justify-between">
                    <div className="grid content-end mb-5">
                        <p className="font-nunito text-heading-xl text-white">{Math.round(weatherData.main.temp)}°C</p>
                        <p className="font-nunito text-heading-sm text-white">
                            {Math.round(weatherData.main.temp_min)}°c/
                            {Math.round(weatherData.main.temp_max)}°c
                        </p>
                        <p className="font-nunito text-text-sm text-white">
                            {weatherData.weather[0].description.charAt(0).toUpperCase() +
                                weatherData.weather[0].description.slice(1)}
                        </p>
                    </div>
                    <div>
                        <img
                            src={`/İcons/${weatherData.weather[0].icon}.svg`}
                            alt={weatherData.weather[0].description}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
