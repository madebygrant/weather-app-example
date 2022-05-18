import React, { useState, useEffect } from 'react';
import './app.scss';
import WeatherBlock from './components/WeatherBlock';
import Notice from './components/Notice';
import Spinner from './components/Spinner';

function App() {
    const [locationCoords, setLocationCoords] = useState<{ lat: number, long: number }>({lat:0, long:0});
    const [locationStatus, setLocationStatus] = useState<string>("");
    const [weatherData, setWeatherData] = useState<any>({});
    const [locationLoading, setLocationLoading] = useState<boolean>(true);
    const [weatherLoading, setWeatherLoading] = useState<boolean>(true);
    const [fetchStatus, setFetchStatus] = useState<string>("");

    const refreshDataMinutes = 1000 * 60 * 10; // Set for 10 minutes, the length to wait for to refresh the weather data

    /**
     * Get the user's location from browser
     */
    const getLocation = () => {
        const geolocationAPI = navigator.geolocation;

        if (!geolocationAPI) {
            setLocationStatus('Geolocation is not supported by your browser');
        } 
        else {
            geolocationAPI.getCurrentPosition(
                (position) => {
                    const { coords } = position;

                    setLocationStatus("");
                    setLocationCoords({ 
                        lat: coords.latitude, 
                        long: coords.longitude
                    })
                    setLocationLoading(false);
                }, 
                () => {
                    setLocationStatus('Unable to retrieve your location');
                }
            );
        }
    }

    /**
     * Fetch the weather data from OpenWeather's API
     */
    const fetchWeather = () => {
        const apiURL = `http://api.openweathermap.org/data/2.5/weather?lat=${locationCoords.lat}&lon=${locationCoords.long}&units=metric&appid=8ec13c7dbc53c3ea8883f5062b5d1205`;

        // Reset the loading state
        setWeatherLoading(true);

        // Fetch the data
        fetch(apiURL)
        .then(response => {
            if(response.ok){
                return response.json()
            }
            throw response;
        })
        .then(data => {
            const isDay = data.weather[0].icon.includes('d') ? true : false; // Determine if it's daytime or not
            
            // Create an object with selected data from the request
            const selectedData = {
                city: data.name,
                feels_like: data.main.feels_like,
                min: data.main.temp_min,
                max: data.main.temp_max,
                current: data.main.temp,
                weather: data.weather[0].main,
                icon: data.weather[0].icon,
                is_day: isDay
            }

            setWeatherData(selectedData); // Add the newly created object to a state
            setWeatherLoading(false); // Change the state, indicate it has completed fetching the data
        })
        .catch((error) => {
            setFetchStatus(error);
            console.log(error);
        })
    }

    useEffect(() => {
        // Get the user's location from the browser
        getLocation();
    }, [])

    useEffect(() => {

        // Refresh the weather data at intervals
        const refresh = setInterval(() => {
            const current = new Date();
            fetchWeather();
            console.log(`Weather data has been refreshed at: ${current.toLocaleTimeString("en-US")}`);
        }, refreshDataMinutes);

        // Get the weather data at mount
        if( !locationLoading ){
            fetchWeather();
        }

        // Clear the interval
        return () => clearInterval(refresh);

    }, [locationLoading]);
    
    // Render
    return (
        <div className="weather-app">

            {/* Location status notice, if an issue occurs */}
            {locationStatus !== '' && (
                <Notice message={locationStatus} />
            )}
            
            {/* Fetching the API status notice, if an issue occurs */}
            {fetchStatus !== '' && (
                <Notice message={fetchStatus} />
            )}

            {/* Loading spinner */}
            {weatherLoading && (
                <Spinner />
            )}

            {/* Render the weather block component when the weather data is available */}
            { !weatherLoading && (
                <WeatherBlock data={weatherData} />
            )}

        </div>
    );
}

export default App;
