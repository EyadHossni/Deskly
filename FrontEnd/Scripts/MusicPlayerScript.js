const Thumbnail = document.getElementById("SongThumbnail");
const SongTitle = document.getElementById("SongTitle");
const SongArtist = document.getElementById("SongArtist");

let ActiveState = "PlayButton";

let TimeToWait = 2 * 1000;

async function GetSongInfo(){
    const song = await fetch("http://localhost:5000/MusicPlayer/GetSongInfo").then(r => r.json());

    if (song.status === "Playing") SetPlayingStateIcon("PauseButton");
    else SetPlayingStateIcon("PlayButton");

    SongTitle.innerText = song.name;
    SongArtist.innerText = song.artist;

    Thumbnail.src = `http://localhost:5000/MusicPlayer/GetThumbnail?t=${Date.now()}`;
    Thumbnail.classList.remove("Invisible");
}

function SetPlayingStateIcon(ID){
    if (ActiveState !== ID && document.getElementById(ID).classList.contains("Invisible")){
        document.getElementById(ActiveState).classList.add("Invisible");
        document.getElementById(ID).classList.remove("Invisible");
        ActiveState = ID;
    }
}

Thumbnail.addEventListener("error", () => {
    Thumbnail.classList.add("Invisible");
});


GetSongInfo();
setInterval(GetSongInfo, TimeToWait);

// // Tell WinWidgets to stop/resume playback
// window.chrome.webview.postMessage('ToggleMediaPlayback');
//
// // Tell WinWidgets to go to the next track
// window.chrome.webview.postMessage('NextMediaTrack');
//
// // Tell WinWidgets to go to the previous track
// window.chrome.webview.postMessage('PreviousMediaTrack');