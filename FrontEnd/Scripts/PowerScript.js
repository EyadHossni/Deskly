const PowerElement = document.getElementById("Power");

let CurrentElementID = "Full";

async function monitorBatteryStatus() {
    if (!navigator.getBattery) {
        console.warn("The Battery Status API is not supported in this browser.");
        return;
    }

    try {
        const battery = await navigator.getBattery();

        function printBatteryStats() {
            let Charge = Math.round(battery.level * 100);

            console.log(`Battery Level: ${Charge}%`);
            console.log(`Is Charging?: ${battery.charging ? "Yes" : "No"}`);
            console.log(`Time to Full Charge: ${battery.chargingTime} seconds`);
            console.log(`Time to Depletion: ${battery.dischargingTime} seconds`);

            PowerElement.innerText = Math.round(battery.level * 100);

            if (battery.charging) SetBatteryIcon("Charging");
            else {
                if (Charge > 80) SetBatteryIcon("Full");
                else if (Charge > 60) SetBatteryIcon("ThreeQuarters");
                else if (Charge > 40) SetBatteryIcon("Half");
                else if (Charge > 20) SetBatteryIcon("Quarter");
                else SetBatteryIcon("Empty");
            }
        }

        printBatteryStats();

        battery.addEventListener("levelchange", printBatteryStats);
        battery.addEventListener("chargingchange", printBatteryStats);

    } catch (error) {
        console.error("Failed to access battery status:", error);
    }
}

function SetBatteryIcon(ElementID) {
    document.getElementById(CurrentElementID).classList.add("Invisible");
    document.getElementById(ElementID).classList.remove("Invisible");
    CurrentElementID = ElementID;
}

monitorBatteryStatus();
