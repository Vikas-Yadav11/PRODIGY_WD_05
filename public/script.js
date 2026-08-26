const cityInput = document.getElementById("cityInput");

const searchBtn = document.getElementById("searchBtn");

const locationBtn = document.getElementById("locationBtn");


const weatherCard =
    document.getElementById("weatherCard");

const errorMessage =
    document.getElementById("errorMessage");


const cityName =
    document.getElementById("cityName");

const country =
    document.getElementById("country");


const weatherIcon =
    document.getElementById("weatherIcon");

const weatherCondition =
    document.getElementById("weatherCondition");


const temperature =
    document.getElementById("temperature");

const feelsLike =
    document.getElementById("feelsLike");


const humidity =
    document.getElementById("humidity");

const windSpeed =
    document.getElementById("windSpeed");

const pressure =
    document.getElementById("pressure");


// Search button

searchBtn.addEventListener("click", () => {

    const city =
        cityInput.value.trim();


    if (city === "") {

        showError(
            "Please enter a city name."
        );

        return;
    }


    getWeatherByCity(city);

});


// Enter key

cityInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            const city =
                cityInput.value.trim();


            if (city === "") {

                showError(
                    "Please enter a city name."
                );

                return;
            }


            getWeatherByCity(city);

        }

    }
);


// Get weather by city

async function getWeatherByCity(city) {

    clearError();


    try {

        const response =
            await fetch(
                `/api/weather?city=${encodeURIComponent(city)}`
            );


        if (!response.ok) {

            if (response.status === 404) {

                throw new Error(
                    "City not found."
                );

            }


            throw new Error(
                "Unable to fetch weather data."
            );

        }


        const data =
            await response.json();


        displayWeather(data);

    }


    catch (error) {

        showError(
            error.message
        );

    }

}


// Location button

locationBtn.addEventListener(
    "click",
    () => {

        clearError();


        if (!navigator.geolocation) {

            showError(
                "Geolocation is not supported by your browser."
            );

            return;
        }


        navigator.geolocation.getCurrentPosition(

            (position) => {

                const latitude =
                    position.coords.latitude;


                const longitude =
                    position.coords.longitude;


                getWeatherByCoordinates(
                    latitude,
                    longitude
                );

            },


            () => {

                showError(
                    "Unable to access your location."
                );

            }

        );

    }
);


// Get weather by coordinates

async function getWeatherByCoordinates(
    latitude,
    longitude
) {

    clearError();


    try {

        const response =
            await fetch(
                `/api/weather/coordinates?lat=${latitude}&lon=${longitude}`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to fetch weather data."
            );

        }


        const data =
            await response.json();


        displayWeather(data);

    }


    catch (error) {

        showError(
            error.message
        );

    }

}


// Display weather

function displayWeather(data) {

    cityName.textContent =
        data.name;


    country.textContent =
        data.sys.country;


    temperature.textContent =
        Math.round(data.main.temp);


    feelsLike.textContent =
        `Feels like: ${Math.round(
            data.main.feels_like
        )}°C`;


    weatherCondition.textContent =
        data.weather[0].description;


    humidity.textContent =
        `${data.main.humidity}%`;


    windSpeed.textContent =
        `${(
            data.wind.speed * 3.6
        ).toFixed(1)} km/h`;


    pressure.textContent =
        `${data.main.pressure} hPa`;


    // Weather icon

    const iconCode =
        data.weather[0].icon;


    weatherIcon.src =
        `https://openweathermap.org/img/wn/${iconCode}@2x.png`;


    weatherIcon.alt =
        data.weather[0].description;


    clearError();

}


// Show error

function showError(message) {

    errorMessage.textContent =
        message;

}


// Clear error

function clearError() {

    errorMessage.textContent =
        "";

}