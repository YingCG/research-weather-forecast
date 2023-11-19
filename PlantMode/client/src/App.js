// import React, { useEffect, useState } from 'react'

// function App() {
//   const [data, setData] = useState([{}])

//   useEffect(() => {
//     fetch("/weathers").then(
//       res => res.json()
//     ).then(
//       data => {
//         setData(data)
//         console.log(data)
//       }
//     )
//   }, [])

//   return (
//     <div>
//       {/* {data.weathers} */}
//       {(typeof data.weathers === 'undefined') ? (
//         <p>Loading...</p>
//       ): (
//         data.weathers.map((waterlevel, i) => (
//           <p key={i}>{waterlevel}</p>
//         ))
//       )}
//     </div>
//   )
// }

// export default App

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [todayWeather, setTodayWeather] = useState({});
    const [pastWeekWeather, setPastWeekWeather] = useState([]);
    const [prediction, setPrediction] = useState("");

    useEffect(() => {
        // Fetch today's weather data from the OpenWeatherMap API
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Auckland&appid=${process.env.API_KEY}`)
            .then(response => {
                // Extract relevant data from the response, e.g., temperature and rainfall
                const temperature = response.data.main.temp;
                const rainfall = 0; // You need to get actual rainfall data from the API

                setTodayWeather({ temperature, rainfall });
            })
            .catch(error => {
                console.error(error);
            });

        // Fetch past week's weather data from an API or your database
        // For this example, I'll assume it's in an array format
        const pastWeekData = []; // Replace with your data

        setPastWeekWeather(pastWeekData);
    }, []);

    const predictWeather = async () => {
        try {
            // Send a POST request to your Flask API with today's and past week's weather data
            const response = await axios.post('/weathers', {
                today: todayWeather,
                past_week: pastWeekWeather
            });
            setPrediction(response.data.prediction);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Weather Prediction</h1>
            <button onClick={predictWeather}>Predict Weather</button>
            {prediction && <p>Prediction: {prediction}</p>}
        </div>
    );
}

export default App;