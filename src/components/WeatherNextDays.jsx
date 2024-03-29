import PropTypes from 'prop-types';

export const WeatherNextDays = ({ forecastData }) => {
    WeatherNextDays.propTypes = {
        forecastData: PropTypes.object,
    };
    return (
        <div className="w-[22rem] h-[12rem] bg-gray-800 mt-1 rounded-md p-4">
            <div className="grid grid-cols-5 h-[100%]">
                {forecastData.list.map((item, index) => {
                    if ((index + 1) % 8 === 0) {
                        return (
                            <div key={index} className="grid content-between justify-items-center">
                                <p className="text-gray-200 font-nunito text-heading-xs">
                                    {new Date(item.dt_txt)
                                        .toLocaleTimeString('en-US', {
                                            weekday: 'long',
                                            minute: 'numeric',
                                        })
                                        .slice(0, 3)}
                                </p>
                                <img
                                    src={
                                        item.weather[0].icon.slice(0, 2) !== '13' &&
                                        item.weather[0].icon.slice(0, 2) !== '50' &&
                                        item.weather[0].icon.slice(0, 2) !== '04'
                                            ? `/İcons/${item.weather[0].icon}.svg`
                                            : `/İcons/02d.svg`
                                    }
                                    alt={item.weather[0].description}
                                    className=""
                                />
                                <div>
                                    <p className="text-gray-100 font-nunito text-heading-xs">
                                        {Math.round(item.main.temp_max)}°c
                                    </p>
                                    <p className="text-gray-400 font-nunito text-heading-xs">
                                        {Math.round(item.main.temp_min)}°c
                                    </p>
                                </div>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};
