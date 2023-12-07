from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/weathers', methods=['POST'])
def weathers():
    data = request.json
    temperature = data['temperature']
    rainfall = data['rainfall']

    # Call OpenWeatherMap API to get current weather data for Auckland
    CITY = "Auckland"
    BASE_URL = "http://api.openweathermap.org/data/2.5/weather?"
    API_KEY =  open('9aea4dcb1ddec26d9d8e0907f4beb784', 'r').read()

    weather_url = f"{BASE_URL}q={CITY}&appid={API_KEY}"

    try:
        response = requests.get(weather_url)
        weather_data = response.json()

        # Perform weather prediction logic based on temperature, rainfall, and weather_data

        # For now, let's assume a simple prediction
        if temperature > 25 and rainfall < 50:
            prediction = "Very hot and very dry"
        else:
            prediction = "Not very hot or not very dry"

        return jsonify({"prediction": prediction})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == "__main__":
    app.run(debug=True)