require("dotenv").config();
const express = require("express");

// don't need to install https it comes with node just require it
const https = require("https");

const app = express();

// user sends get request to our server
app.get("/", (req, res) => {
  // now we have to make a get request to third party server
  // create a variable for very long url
  const url = `https://api.openweathermap.org/data/2.5/weather?q=Las Vegas&appid=${process.env.API_KEY}&units=imperial`;
  https.get(
    // going to call third party server response instead or res so not to confuse it with our servers response to client
    url,
    (response) => {
      console.log(response.statusCode);

      response.on("data", (data) => {
        const weatherData = JSON.parse(data);
        const temp = Math.round(weatherData.main.temp);
        console.log(temp);
        const weatherDescription = weather[0].description;
        console.log(weatherDescription)
      });
    }
  );
  res.send("WE are up and running");
});

app.listen(3000, () => {
  console.log("Server listening on 3000");
});
