import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

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
        const geoResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${APIkey}`);
        const lat = geoResponse.data[0].lat;
        const lon = geoResponse.data[0].lon;
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}&lang=pt_br`);
        const weatherDescription = weatherResponse.data.daily[1].weather[0].description;
        const weatherIcon = weatherResponse.data.daily[1].weather[0].icon;
        res.render("index.ejs", {
            weather: weatherDescription,
            iconCode: weatherIcon
        });
    } catch (error) {
        console.log(error.response ? error.response.data.message : error.message);
        res.render("index.ejs", {
            error: "Erro ao obter dados meteorológicos"
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});