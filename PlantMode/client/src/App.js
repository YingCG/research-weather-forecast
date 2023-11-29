import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [todayWeather, setTodayWeather] = useState({});
    const [pastWeekWeather, setPastWeekWeather] = useState([]);
    const [prediction, setPrediction] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch today's weather data from the OpenWeatherMap API
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Auckland&appid=${process.env.API_KEY}`)
            .then(response => {
                const temperature = response.data.main.temp;
                const rainfall = 0; // Replace with actual rainfall data

                setTodayWeather({ temperature, rainfall });
            })
            .catch(error => {
                console.error(error);
                setError("Error fetching today's weather data");
            });

        // Fetch past week's weather data from an API or your database
        // For this example, I'll assume it's in an array format
        const pastWeekData = []; // Replace with your data

        setPastWeekWeather(pastWeekData);
    }, []);

    const predictWeather = async () => {
        try {
            setLoading(true);

            // Send a POST request to your Flask API with today's and past week's weather data
            const response = await axios.post('/weathers', {
                today: todayWeather,
                past_week: pastWeekWeather
            });

            setPrediction(response.data.prediction);
        } catch (error) {
            console.error(error);
            setError("Error predicting weather");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Weather Prediction</h1>
            <button onClick={predictWeather} disabled={loading}>
                {loading ? 'Predicting...' : 'Predict Weather'}
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {prediction && (
                <div>
                    <h2>Prediction: {prediction}</h2>
                    {/* Display additional prediction details if available */}
                </div>
            )}
        </div>
    );
}

export default App;
