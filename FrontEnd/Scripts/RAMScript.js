const applicationTimeIntervalInMilliSecs = 2 * 1000;

const CPUUsageElement = document.getElementById("RAM-Usage");

function GetMemoryInfo(memInfo)
{
    CPUUsageElement.innerText = Math.round((memInfo.usedPhysMem / memInfo.totalPhysMem) * 100);

    console.log('Total Physical Memory:', memInfo.totalPhysMem);
    console.log('Used Physical Memory:', memInfo.usedPhysMem);
    console.log('Total Virtual Memory:', memInfo.totalVirtMem);
    console.log('Used Virtual Memory:', memInfo.usedVirtMem);
}

window.chrome.webview.postMessage('GetMemoryInfo');

setInterval(() => {
    window.chrome.webview.postMessage('GetMemoryInfo');
}, applicationTimeIntervalInMilliSecs)