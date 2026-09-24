const OtherCountriesGrid = document.getElementById("WorldClockGrid");
const Timezones = ['Asia/Riyadh', 'Europe/London', 'Asia/Tokyo', 'America/New_York'];

const CurrentTimeElement = document.getElementById("CurrentTime");
const CurrentDateElement = document.getElementById("CurrentDate");
const LocationTimezone = document.getElementById("LocationTimezone");

function getTimeInLocation(timeZone) {
    return new Date().toLocaleTimeString('en-US', {
        timeZone: timeZone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true // Set to false for 24-hour format
    });
}

function UpdateTime(){
    OtherCountriesGrid.innerHTML = "";
    const MainTimeData = getTimeInLocation('Africa/Cairo');
    CurrentTimeElement.innerText = MainTimeData;
    CurrentDateElement.innerText = (new Date()).toLocaleDateString('en-US', { dateStyle: 'full' });
    LocationTimezone.innerText = 'Africa/Cairo';

    const Hours = Number(MainTimeData.split(":")[0]);
    const TimeState = MainTimeData.split(" ")[1];

    if ((Hours >= 8 && TimeState === "PM") || (Hours < 7 && TimeState === "AM")){
        document.getElementById(`SunnyIcon`).classList.add("NonExistent");
        document.getElementById(`NightIcon`).classList.remove("NonExistent");
    }
    else{
        document.getElementById(`SunnyIcon`).classList.remove("NonExistent");
        document.getElementById(`NightIcon`).classList.add("NonExistent");
    }

    for(let i = 0; i < 4; i++){
        let TimeData = getTimeInLocation(Timezones[i]);
        OtherCountriesGrid.innerHTML += `
        <div class="WorldClockClock">
          <div class="SidedRow">
            <span class="CountryName" id="Country${i}Name">${Timezones[i].split("/")[1].replaceAll("_", " ")}</span>
            <span class="CountryDifferenceTime" id="Country${i}TimeDifference">EEST${SubtractTime(TimeData, MainTimeData)}0</span>
          </div>
          <div class="SidedRow">
            <span class="CountryTime" id="Country${i}Time">${TimeData}</span>
            <i class="fa-regular fa-sun fa-2xs CountryWeatherIcon" id="Country${i}SunnyIcon"></i>
            <i class="fa-regular fa-moon fa-2xs CountryWeatherIcon NonExistent" id="Country${i}NightIcon"></i>
          </div>
        </div>
    `

        const Hours = Number(TimeData.split(":")[0]);
        const TimeState = TimeData.split(" ")[1];

        if ((Hours >= 7 && TimeState === "PM") || (Hours < 7 && TimeState === "AM")){
            document.getElementById(`Country${i}SunnyIcon`).classList.add("NonExistent");
            document.getElementById(`Country${i}NightIcon`).classList.remove("NonExistent");
        }
        else{
            document.getElementById(`Country${i}SunnyIcon`).classList.remove("NonExistent");
            document.getElementById(`Country${i}NightIcon`).classList.add("NonExistent");
        }

    }
}

function SubtractTime(Time1, Time2){
    const Time1InHours = Number(Time1.split(":")[0]);
    const Time1InMinutes = Number(Time1.split(":")[1].split(" ")[0]);
    const Time1State = Time1.split(" ")[1];
    const Time2InHours = Number(Time2.split(":")[0]);
    const Time2InMinutes = Number(Time2.split(":")[1].split(" ")[0]);
    const Time2State = Time2.split(" ")[1];

    let Time1AllMinutes = Time1InHours * 60 + Time1InMinutes;
    let Time2AllMinutes = Time2InHours * 60 + Time2InMinutes;

    if (Time1State === "PM") Time1AllMinutes += 720;
    if (Time2State === "PM") Time2AllMinutes += 720;

    let AllMinutes = Time1AllMinutes - Time2AllMinutes;

    let sign;
    if (AllMinutes >= 0){
        sign = "+";
    }
    else{
        sign = "-"
        AllMinutes = - AllMinutes;
    }

    let AllHours = Math.floor(AllMinutes / 60);
    let RemMinutes = AllMinutes - AllHours * 60;

    if (AllHours > 12) {
        sign = sign === "+" ? "-": "+";
        AllHours = 24 - AllHours;
    }
    return `${sign}${AllHours}:${RemMinutes}`;
}

UpdateTime();
setInterval(UpdateTime, 10000);
