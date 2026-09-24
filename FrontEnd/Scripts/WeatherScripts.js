let WeatherCodes = {}

const Temperature = document.getElementById("Temperature");
const LocationElement = document.getElementById("LocationAddress");
const WeatherSummaryElement = document.getElementById("WeatherSummary");
const RelativeHumidityValue = document.getElementById("RelativeHumidity");
const PrecipitationProbabilityValue = document.getElementById("PrecipitationProbability");
const WindSpeedElement = document.getElementById("WindSpeed");

let ActiveWeatherIcon = "Sunny";

const WeatherWidget = document.getElementById("WeatherWidget");

const applicationTimeIntervalInMilliSecs = 10 * 60000;

let LocationData;
let ResetLocation = true;

async function fetchData() {
    if (ResetLocation){
        LocationData = await GetLocationData();
        console.log(`Latitude: ${LocationData.latitude}, Longitude: ${LocationData.longitude}`);
        ResetLocation = false;
    }

    let response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${LocationData.latitude}&longitude=${LocationData.longitude}&daily=weather_code,precipitation_probability_max,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,moon_phase&current=apparent_temperature,is_day,wind_speed_10m,weather_code,rain,relative_humidity_2m&timezone=auto&forecast_days=1`)

    if (!response.ok){
        throw Error("An Error Occurred with the API");
    }

    const data = await response.json();

    console.log(data);

    Temperature.innerText = data.current.apparent_temperature;
    LocationElement.innerText = `${LocationData.location}, ${LocationData.country}`;
    WeatherSummaryElement.innerText = WeatherCodes[data.current.weather_code];
    RelativeHumidityValue.innerText = `${data.current.relative_humidity_2m}%`
    PrecipitationProbabilityValue.innerText = `${data.daily.precipitation_probability_max}%`
    WindSpeedElement.innerText = (data.current.wind_speed_10m / 3.6).toFixed(2);
    SetWeatherIcon(data.current.weather_code, data.current.is_day);
}

async function GetLocationData() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                    );

                    const data = await response.json();

                    resolve({
                        latitude,
                        longitude,
                        location: data.address.city ||
                            data.address.town ||
                            data.address.village ||
                            data.address.state,
                        country: data.address.country
                    });

                } catch (error) {
                    reject(error);
                }
            },

            (error) => {
                reject(error);
            }
        );
    });
}

function FixWeatherCodes(){
    WeatherCodes[0] = "Clear Sky";
    WeatherCodes[1] = "Mainly Clear";
    WeatherCodes[2] = "Partly Cloudy";
    WeatherCodes[3] = "Overcast";
    WeatherCodes[45] = "Fog";
    WeatherCodes[48] = "Depositing Rime Fog";
    WeatherCodes[51] = "Light Drizzle";
    WeatherCodes[53] = "Moderate Drizzle";
    WeatherCodes[55] = "Dense Drizzle";
    WeatherCodes[56] = "Light Freezing Drizzle";
    WeatherCodes[57] = "Dense Freezing Drizzle";
    WeatherCodes[61] = "Slight Rain";
    WeatherCodes[63] = "Moderate Rain";
    WeatherCodes[65] = "Heavy Rain";
    WeatherCodes[66] = "Light Freezing Rain";
    WeatherCodes[67] = "Heavy Freezing Rain";
    WeatherCodes[71] = "Slight Snow Fall";
    WeatherCodes[73] = "Moderate Snow Fall";
    WeatherCodes[75] = "Heavy Snow Fall";
    WeatherCodes[77] = "Snow Grains";
    WeatherCodes[80] = "Slight Rain Showers";
    WeatherCodes[81] = "Moderate Rain Showers";
    WeatherCodes[82] = "Violent Rain Showers";
    WeatherCodes[85] = "Slight Snow Showers";
    WeatherCodes[86] = "Heavy Snow Showers";
    WeatherCodes[95] = "Thunderstorm: Slight or moderate";
    WeatherCodes[96] = "Thunderstorm with Slight Hail";
    WeatherCodes[99] = "Thunderstorm with Heavy Hail";
}

function SetWeatherIcon(WeatherCode, IsDay) {
    if ([0, 1].includes(WeatherCode)){
        if (IsDay) MakeIconActive("Sunny");
        else MakeIconActive("Night");
    }
    else if ([2, 3].includes(WeatherCode)){
        if (IsDay) MakeIconActive("SunnyCloudy");
        else MakeIconActive("NightCloudy");
    }
    else if ([45, 48].includes(WeatherCode)) MakeIconActive("Fog");
    else if ([51, 53, 55, 56, 57].includes(WeatherCode)){
        if (IsDay) MakeIconActive("SunDrizzle");
        else MakeIconActive("MoonDrizzle");
    }
    else if ([61, 63, 65, 66, 67].includes(WeatherCode)) MakeIconActive("Rainy");
    else if ([71, 73, 75, 77].includes(WeatherCode)) MakeIconActive("Snowy");
    else if ([80, 81, 82, 85, 86].includes(WeatherCode)) MakeIconActive("Showers");
    else if ([95, 96, 99].includes(WeatherCode)) MakeIconActive("Thunderstorm");
}

function MakeIconActive(ElementIcon) {
    document.getElementById(ActiveWeatherIcon).classList.add("Invisible");
    document.getElementById(ElementIcon).classList.remove("Invisible");
    ActiveWeatherIcon = ElementIcon;
}

FixWeatherCodes();
fetchData();
setInterval(fetchData, applicationTimeIntervalInMilliSecs);

// setInterval(() => {ResetLocation = true;}, applicationTimeIntervalInMilliSecs * 3);

// document.addEventListener('mousemove', (event) => {
//     WeatherWidget.style.marginTop = `${event.clientY - WeatherWidget.offsetHeight / 2}px`;
//     WeatherWidget.style.marginLeft = `${event.clientX - WeatherWidget.offsetWidth / 2}px`;
// });