const userLocation = document.getElementById("userLocation"),
converter = document.getElementById("converter"),
weatherIcon = document.querySelector(".weatherIcon"),
temperture = document.querySelector(".temperture"),
feelsLike = document.querySelector(".feelsLike"),
description = document.querySelector(".description"),
city = document.querySelector(".city"),

Hvalue = document.getElementById("Hvalue"),
Wvalue = document.getElementById("Wvalue"),
SRValue = document.getElementById("SRValue"),
SSValue = document.getElementById("SSValue"),
CValue = document.getElementById("CValue"),
UVValue = document.getElementById("UVValue"),
PValue = document.getElementById("PValue"),

Forcast = document.querySelector(".Forcast");

WEATHER_API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?appid=23362604468f3288f7aba5fdcdb81c1f&q=`;
WEATHER_DATA_ENDPOINT = `https://api.openweathermap.org/data/2.5/onecall?appid=23362604468f3288f7aba5fdcdb81c1f&exclude=minutely&units=metric&`;

function findUserLocation() {
    fetch(WEATHER_API_ENDPOINT + userLocation.value)
        .then((response) => response.json())
        .then((data) => {
            if (data.cod !== 200) {
                alert(data.message);
                return;
            }

            console.log("Current Weather Data:", data);

            city.innerHTML=data.name + "," + data.sys.country;
            weatherIcon.style.background= `url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`;
            fetch(`${WEATHER_DATA_ENDPOINT}lon=${data.coord.lon}&lat=${data.coord.lat}`)
                .then((response) => response.json())
                .then((weatherData) => {
                    console.log("Detailed Weather Data:", weatherData);
                    temperture.innerHTML = data.current.temp;
                    feelsLike.innerHTML = "feels Like" + data.current.feels_Like;
                    description.innerHTML = `<i class="fa-brands fa-cloudversify"></i> &nbsp; ` + 
                    data.current.weather[0].description;
                });
        })
        .catch((error) => console.error("Error fetching data:", error));
}