let CalendarOffset = 0;

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const MonthElement = document.getElementById("Month");
const YearElement = document.getElementById("Year");

function UpdateCalender(Offset){
    let time = new Date();
    let FirstDayOfTheMonth = new Date(time.getFullYear(), time.getMonth() + Offset, 1);

    YearElement.innerText = FirstDayOfTheMonth.getFullYear();
    MonthElement.innerText = monthNames[FirstDayOfTheMonth.getMonth()];

    for (let i = 0; i < 42; i++){
        let DateFound = new Date(FirstDayOfTheMonth.getFullYear(), FirstDayOfTheMonth.getMonth(), i - FirstDayOfTheMonth.getDay() + 1);
        let Element = document.getElementById(`Day${i}`);
        Element.innerText = DateFound.getDate();
        if (DateFound.getMonth() !== FirstDayOfTheMonth.getMonth()) Element.classList.add("PastMonthDay");
        else if (DateFound.getDate() === time.getDate() && DateFound.getMonth() === time.getMonth() && DateFound.getFullYear() === time.getFullYear()) {
            Element.classList.add("Today");
            console.log(`Today is ${DateFound}`);
        }
        else {
            Element.classList.remove("PastMonthDay");
            Element.classList.remove("Today");
        }
    }
}

function UpdateCalendarOffset(number){
    CalendarOffset += number;
    UpdateCalender(CalendarOffset);
}

function ScheduleDayChange() {
    const now = new Date();

    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const timeUntilMidnight = tomorrow - now;

    setTimeout(() => {
        UpdateCalender();

        // Schedule the next midnight
        ScheduleDayChange();
    }, timeUntilMidnight);
}

UpdateCalender(CalendarOffset);
ScheduleDayChange();