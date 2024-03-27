const Search = () => {
    return (
        <div className="container  w-96 h-[50rem] bg-search-bg bg-center grid justify-center content-start">
            <img src="../../src/assets/logo/logo.svg" alt="logo" className="justify-self-center pt-6" />
            <div className="py-[10rem]">
                <div className="flex flex-col pb-4 items-center">
                    <p className="text-heading-md font-nunito text-white ">
                        Welcome to <span className="text-blue-light">TypeWeather</span>
                    </p>
                    <p className="font-nunito text-text-sm text-gray-200">
                        Choose a location to see the weather forecast
                    </p>
                </div>
                <div className="flex flex-col ">
                    <input
                        type="text"
                        placeholder="Search location"
                        className="w-72 h-12 rounded-lg text-gray-400 bg-gray-800 pl-4 focus:outline-none"
                    />
                    <button className="w-72 h-12 bg-blue-light text-white font-nunito text-text-md mt-4 rounded-lg">
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Search;
