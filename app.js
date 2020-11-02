require("dotenv").config();
const express = require("express");

// don't need to install https it comes with node just require it
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// user sends get request to our server
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const query = req.body.cityName;

  // now we have to make a get request to third party server
  // create a variable for very long url

  const unit = "imperial";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${process.env.API_KEY}&units=${unit}`;
  https.get(
    // going to call third party server response instead or res so not to confuse it with our servers response to client
    url,
    (response) => {
      response.on("data", (data) => {
        const weatherData = JSON.parse(data);
        const temp = Math.round(weatherData.main.temp);
        console.log(temp);
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${icon}@4x.png`;
        res.send(
          `<h1 style="color: orange;">The temperature in ${query} is ${temp} degrees Fahrenheit.</h1> <h3>And the condition is: ${weatherDescription}</h3>.
            <br>
            <img src="${iconUrl}" />`
        );
      });
    }
  );
});
app.listen(3000, () => {
  console.log("Server listening on 3000");
});
