const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req , res){

    res.sendFile(__dirname + "/index.html")
    app.post("/", function(req,res){
    const CityName = req.body.cityName;
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+CityName+"&appid=ef374a74af85fbc8e975eccf362341c3&units=metric"


        https.get(url , function(response ){
            console.log(response.statusCode)
        
            response.on("data", function(data){
                const weatherData = JSON.parse(data)
                const Temperature = weatherData.main.temp
                const icon = "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"
                res.write("<h1> Weather Page</h1>")
                res.write("<h1>The Temp in " +CityName+" is " + Temperature + " Degree Celcius </h1>")
                res.write("<img src="+icon+">")
                res.send()
            })
        })
    })
    
})


app.listen(3000, function(){
    console.log("Server is running");
})

