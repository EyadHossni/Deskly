const FileSelector = document.getElementById("file-selector");
const ImageElement = document.getElementById("Image");

let ImageAvail = false;

ImageElement.src = "http://localhost:5000/SmallImageViewer/thumbnail";

document.addEventListener('keydown', (event) => {
    if (event.key === "Control"){
        ImageAvail = true;
        ImageElement.classList.add("Clickable");
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === "Control"){
        ImageAvail = false;
        ImageElement.classList.remove("Clickable");
    }
});

function GetCurrentKeyPressed(keyCode) {
    if (keyCode === 17){
        ImageAvail = true;
        ImageElement.classList.add("Clickable");
    }
    else {
        ImageAvail = false;
        ImageElement.classList.remove("Clickable");
    }
}

function CheckButtonsClick(){
    window.chrome.webview.postMessage('GetCurrentKeyPressed');
}

setInterval(CheckButtonsClick, 1000/24);

FileSelector.addEventListener('change', async (event) => {
    const file = event.target.files[0];

    if (file) {
        const objectURL = URL.createObjectURL(file);

        ImageElement.classList.remove("Invisible");
        ImageElement.src = objectURL;

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("http://localhost:5000/SmallImageViewer/files", {
            method: "POST",
            body: formData
        });

        console.log(response);
    }
});

ImageElement.addEventListener("error", () => {
    ImageElement.classList.add("Invisible");
});