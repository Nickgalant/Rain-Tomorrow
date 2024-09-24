import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { translate } from "@vitalets/google-translate-api";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded( {extended: true } ));
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/submit", async(req, res) => {
    const cityName = req.body.city;
    const stateCode = req.body.state;
    const countryCode = req. body.country;
    const APIkey = "324e5a35f38d6a7059d5c212acf197b4";
    const limit = 1;
    try {
        const geoResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${APIkey}`);
        const lat = geoResponse.data[0].lat;
        const lon = geoResponse.data[0].lon;
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}`);
        const weatherDescription = weatherResponse.data.daily[1].summary;
        const translatedWeather = await translate(weatherDescription, { from: 'en', to: 'pt' });
        res.render("index.ejs", {
            weather: translatedWeather.text
        });
    } catch (error) {
        console.log(error.response ? error.response.message : error.message);
        res.status(500).send("Erro ao buscar a previsão do tempo");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});