import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export const WeatherDetails = ({ currentWeather, forecast, uvIndex }) => {
    WeatherDetails.propTypes = {
        uvIndex: PropTypes.object,
        currentWeather: PropTypes.object,
        forecast: PropTypes.object,
    };
    const { t } = useTranslation();
    return (
        <div className="grid w-[22rem] h-[20rem] bg-gray-800 mt-1 rounded-md">
            <div className="flex justify-between p-4">
                <div className="flex gap-2 items-center">
                    <img src={`/İcons/thermometer.svg`} alt="Thermometer" className="w-6 h-6" />
                    <p className="text-heading-xs text-gray-200 font-nunito">{t('detail1')}</p>
                </div>
                <p className="text-heading-sm text-gray-100 font-nunito">
                    {Math.floor(currentWeather.data.main.feels_like)}°c
                </p>
            </div>
            <hr className="text-gray-700 border-t-2 w-72 justify-self-center" />
            <div className="flex justify-between p-4">
                <div className="flex gap-2 items-center">
                    <img src={`/İcons/rain.svg`} alt="Rain" className="w-6 h-6" />
                    <p className="text-heading-xs text-gray-200 font-nunito">{t('detail2')}</p>
                </div>
                <p className="text-heading-sm text-gray-100 font-nunito">{forecast.data.list[0].pop}%</p>
            </div>
            <hr className="text-gray-700 border-t-2 w-80 justify-self-center" />
            <div className="flex justify-between p-4">
                <div className="flex gap-2 items-center">
                    <img src={`/İcons/wind.svg`} alt="Wind" className="w-6 h-6" />
                    <p className="text-heading-xs text-gray-200 font-nunito">{t('detail3')}</p>
                </div>
                <p className="text-heading-sm text-gray-100 font-nunito">
                    {currentWeather.data.wind.speed ? `${Math.floor(currentWeather.data.wind.speed)} km/h` : 'No Data'}
                </p>
            </div>
            <hr className="text-gray-700 border-t-2 w-80 justify-self-center" />
            <div className="flex justify-between p-4">
                <div className="flex gap-2 items-center">
                    <img src={`/İcons/drop.svg`} alt="Humidity" className="w-6 h-6" />
                    <p className="text-heading-xs text-gray-200 font-nunito">{t('detail4')}</p>
                </div>
                <p className="text-heading-sm text-gray-100 font-nunito">{currentWeather.data.main.humidity}%</p>
            </div>
            <hr className="text-gray-700 border-t-2 w-80 justify-self-center" />
            <div className="flex justify-between p-4">
                <div className="flex gap-2 items-center">
                    <img src={`/İcons/sun.svg`} alt="UV Index" className="w-6 h-6" />
                    <p className="text-heading-xs text-gray-200 font-nunito">{t('detail5')} </p>
                </div>
                <p className="text-heading-sm text-gray-100 font-nunito">
                    {uvIndex && uvIndex.uv !== undefined ? uvIndex.uv.toFixed(2) : 'No Data'}
                </p>
            </div>
        </div>
    );
};
