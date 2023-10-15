import datetime as dt
import requests

BASE_URL = "http://api.openweathermap.org/data/2.5/weather?"
API_Key = open('/mnt/c/Users/Ying/Dev_WorkspaceYing/weatherapi/api_key', 'r').read()

CITY = "Auckland"

def kelvin_to_celsius_farenheit(kelvin):
    celsius = kelvin - 273.15
    fahrenheit = celsius * (9/5) + 32
    return celsius, fahrenheit

url = BASE_URL + "appid=" + API_Key + "&q=" + CITY
respones = requests.get(url).json()

temp_kelvin = respones['main']['temp']
temp_celsius, temp_fahrenheit = kelvin_to_celsius_farenheit(temp_kelvin)
feels_like_kelvin = respones['main']['feels_like']
wind_speed = respones['wind']['speed']
humidity = respones['main']['humidity']
description = respones['weather'][0]['description']
sunrise_time = dt.datetime.utcfromtimestamp(respones['sys']['sunrise'] + respones['timezone'])
sunset_time = dt.datetime.utcfromtimestamp(respones['sys']['sunset'] + respones['timezone'])

print(f"Temperature in {CITY}: {temp_celsius}")
print(f"But is actually feel like {feels_like_kelvin}")
print(f"Wind speed: {wind_speed}")
print(f"Humidity : {humidity}")
print(f"Description : {description}")
print(f"Sun Rising : {sunrise_time}")
print(f"Sun Setting : {sunset_time}")
