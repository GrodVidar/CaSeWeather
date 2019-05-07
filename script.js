const datadiv =document.getElementById('datadiv');

const postUrl = "https://<Mock-Key>.mockapi.io/Temperature";

const getUrlSe = "http://api.openweathermap.org/data/2.5/weather?id=2673730&APPID=<API-KEY>&units=metric";
const getUrlCa = "http://api.openweathermap.org/data/2.5/weather?id=6183235&APPID=<API-KEY>&units=metric";

var caTemp;
var seTemp;

var svea = "Stockholm";
var canda = "Winnipeg";


fetch(getUrlSe)
    .then(response => response.json())
        .then(data =>
        {
            seTemp = data.main.temp;
            let divtagSe = document.createElement('div');
            divtagSe.innerHTML = `Stockholm temperature: ${data.main.temp}°C`;
            //console.log(data.main.temp);
            datadiv.appendChild(divtagSe);
        })
fetch(getUrlCa)
    .then(response =>
    {
        return response.json()
    })
    .then(data=>
    {
        caTemp = data.main.temp;
        var diff = Math.abs(seTemp - caTemp);
        let divtagCa = document.createElement('div');
        divtagCa.innerHTML = `Winnipeg temperature: ${data.main.temp}°C <br> Difference: ${diff}°C`;
        datadiv.appendChild(divtagCa);
        console.log(diff);
        f_diff(caTemp, canda, diff);
        f_diff(seTemp, svea, diff);

    })

function f_diff(temperature, city, difference)
{
    var data = {Temp: temperature, City: city, diff: difference};
        fetch(postUrl,
        {
            method:'post',
            headers:
            {
                'Accept' : 'application/json, text/plain, */*',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => console.log(res))
}
