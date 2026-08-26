const express = require("express");

const dotenv = require("dotenv");


dotenv.config();


const app = express();

const PORT = 3000;


// Serve frontend files

app.use(
    express.static("public")
);


// Weather by city

app.get(
    "/api/weather",
    async (req, res) => {

        const city =
            req.query.city;


        if (!city) {

            return res.status(400).json({

                message:
                    "City is required."

            });

        }


        try {

            const url =
                `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;


            const response =
                await fetch(url);


            const data =
                await response.json();


            if (!response.ok) {

                return res
                    .status(response.status)
                    .json(data);

            }


            res.json(data);

        }


        catch (error) {

            console.error(error);


            res.status(500).json({

                message:
                    "Server error."

            });

        }

    }
);


// Weather by coordinates

app.get(
    "/api/weather/coordinates",
    async (req, res) => {

        const {
            lat,
            lon
        } = req.query;


        if (!lat || !lon) {

            return res.status(400).json({

                message:
                    "Latitude and longitude are required."

            });

        }


        try {

            const url =
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;


            const response =
                await fetch(url);


            const data =
                await response.json();


            if (!response.ok) {

                return res
                    .status(response.status)
                    .json(data);

            }


            res.json(data);

        }


        catch (error) {

            console.error(error);


            res.status(500).json({

                message:
                    "Server error."

            });

        }

    }
);


// Start server

app.listen(
    PORT,
    () => {

        console.log(
            `Server running at http://localhost:${PORT}`
        );

    }
);