export const HomeComponent = ({ currentWeather, forecast, currentUV }) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date().toLocaleDateString('en-US', options);

    {
        return currentWeather && forecast ? (
            <div className="container w-[23rem]  bg-search-bg bg-center grid justify-center content-start gap-1">
                <div className="w-[22rem] h-[21rem] bg-gray-800 mt-1 rounded-md">
                    <div
                        style={{
                            backgroundImage: `url('../../src/assets/images/${currentWeather.data.weather[0].icon}.png')`,
                        }}
                        className={` bg-center m-2 w-[21rem] h-[19rem] rounded-md p-4 grid content-between`}
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
                <div className="grid w-[22rem] h-[20rem] bg-gray-800 mt-1 rounded-md">
                    <div className="flex justify-between p-4  ">
                        <div className="flex gap-2 items-center">
                            <img src="../../src/assets/İcons/thermometer.svg" alt="" className="w-6 h-6" />
                            <p className="text-heading-xs text-gray-200 font-nunito">Thermal sensation</p>
                        </div>
                        <p className="text-heading-sm text-gray-100 font-nunito   ">
                            {Math.floor(currentWeather.data.main.feels_like)}°c
                        </p>
                    </div>
                    <hr className="text-gray-700 border-t-2 w-72 justify-self-center" />
                    <div className="flex justify-between p-4  ">
                        <div className="flex gap-2 items-center">
                            <img src="../../src/assets/İcons/rain.svg" alt="" className="w-6 h-6" />
                            <p className="text-heading-xs text-gray-200 font-nunito">Probability of rain</p>
                        </div>
                        <p className="text-heading-sm text-gray-100 font-nunito   ">{forecast.data.list[0].pop}%</p>
                    </div>
                    <hr className="text-gray-700 border-t-2 w-80 justify-self-center" />
                    <div className="flex justify-between p-4  ">
                        <div className="flex gap-2 items-center">
                            <img src="../../src/assets/İcons/wind.svg" alt="" className="w-6 h-6" />
                            <p className="text-heading-xs text-gray-200 font-nunito">Wind speed</p>
                        </div>
                        <p className="text-heading-sm text-gray-100 font-nunito   ">
                            {currentWeather.data.wind.speed
                                ? Math.floor(currentWeather.data.wind.speed) + 'km/h'
                                : 'No Data'}
                        </p>
                    </div>
                    <hr className="text-gray-700 border-t-2 w-80 justify-self-center" />
                    <div className="flex justify-between p-4  ">
                        <div className="flex gap-2 items-center">
                            <img src="../../src/assets/İcons/drop.svg" alt="" className="w-6 h-6" />
                            <p className="text-heading-xs text-gray-200 font-nunito">Air humidty</p>
                        </div>
                        <p className="text-heading-sm text-gray-100 font-nunito   ">
                            {currentWeather.data.main.humidity}%
                        </p>
                    </div>
                    <hr className="text-gray-700 border-t-2 w-80 justify-self-center" />
                    <div className="flex justify-between p-4  ">
                        <div className="flex gap-2 items-center">
                            <img src="../../src/assets/İcons/sun.svg" alt="" className="w-6 h-6" />
                            <p className="text-heading-xs text-gray-200 font-nunito">UV Index</p>
                        </div>
                        <p className="text-heading-sm text-gray-100 font-nunito   ">{currentUV.uv}</p>
                    </div>
                </div>
                <div className="w-[22rem] h-[12rem] bg-gray-800 mt-1 rounded-md  p-4 ">
                    <div className="grid grid-cols-5 h-[100%]">
                        {forecast.data.list.map((item, index) => {
                            if (index % 8 === 0) {
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
                                                    ? `../../src/assets/İcons/${item.weather[0].icon}.svg`
                                                    : `../../src/assets/İcons/02d.svg`
                                            }
                                            alt=""
                                            className=""
                                        />
                                        <div className="">
                                            <p className="text-gray-100 font-nunito text-heading-xs">
                                                {Math.round(item.main.temp_max)}°c
                                            </p>
                                            <p className=" text-gray-400 font-nunito text-heading-xs">
                                                {Math.round(item.main.temp_min)}°c
                                            </p>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        ) : (
            <div className="container w-[23rem] h-[100vh] bg-search-bg bg-center grid justify-center content-start"></div>
        );
    }
};
