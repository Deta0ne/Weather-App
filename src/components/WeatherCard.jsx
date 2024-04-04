import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export const WeatherCard = ({ weatherData, lang }) => {
    WeatherCard.propTypes = {
        weatherData: PropTypes.object,
        lang: PropTypes.string,
    };

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date().toLocaleDateString(lang, options);

    const { t } = useTranslation();

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
                            {t(`${weatherData.weather[0].description}`)}
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
