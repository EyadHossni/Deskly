
const applicationTimeIntervalInMilliSecs = 2 * 1000;
const CPUUsageElement = document.getElementById("CPU-Usage");

function GetCpuLoad(percentage)
{
    CPUUsageElement.innerText = Math.round(percentage);
}

window.chrome.webview.postMessage('GetCpuLoad');

setInterval(() => {
    window.chrome.webview.postMessage('GetCpuLoad');
}, applicationTimeIntervalInMilliSecs);
