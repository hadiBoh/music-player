const playlistBtn = document.querySelector("#playlist-btn"),
    playList = document.querySelector(".play-list"),
    myAudio = document.createElement("audio"),
    trackDurationDOM = document.querySelector("#track-duration"),
    trackCurrentTimeDOM = document.querySelector("#track-current-time"),
    playPauseBtn = document.querySelector("#play"),
    bar = document.querySelector(".bar")

const musics = [
    {
        name: "Çok Üzgünsün Arkadaş",
        artist: "Ebru Gündeş",
        img: "images/m1.jpg",
        src: "./music/05 Çok Üzgünsün Arkadaş.mp3"
    },
    {
        name: "Hayat",
        artist: "Ebru Gündeş",
        img: "images/m1.jpg",
        src: "./music/01 Hayat.mp3"
    },
    {
        name: "Dayanamadim",
        artist: "Hakan Altun",
        img: "images/m3.png",
        src: "./music/Hakan Altun Dayanamadim Mp3 indir.mp3"
    }
]

// global vars
let counter = -1
let first = true
index = 0
let currentTrack
let barMoveId

//open playlist
playlistBtn.addEventListener("click", () => {
    playList.classList.add("active")
})

//close playlist
document.addEventListener("click", (e) => {
    isClickedPlayList = e.target.closest(".play-list")
    isClickedPlayListBtn = e.target.closest("#playlist-btn")
    if (!isClickedPlayList && !isClickedPlayListBtn) playList.classList.remove("active")
})


window.addEventListener("load", loadingSong)
function loadingSong() {
    loadSong(0)
}

document.querySelector(".bx-skip-next-circle").addEventListener("click",nextSong = () => {

    index === musics.length - 1 ? index = 0 : index++
    loadSong(index)
    playSong()
})


document.querySelector(".bx-skip-previous-circle").addEventListener("click", () => {
    index === 0 ? index = musics.length - 1 : index--
    loadSong(index)
    playSong()
})

function loadSong(index) {
    myAudio.src = musics[index].src
    document.querySelector(".title").innerHTML = musics[index].name
    document.querySelector("img").src = musics[index].img
    document.querySelector(".subtitle").innerHTML = musics[index].artist
    currentTrack = myAudio
    currentTrack.load()
}


playPauseBtn.addEventListener("click", () => {
    isPlaying = playPauseBtn.classList.contains("bx-pause-circle")
    !isPlaying ? playSong() : pause()
    getDuration()
})

function playSong() {
    currentTrack.play()
    barMoveId = setInterval(movingProgressBar, 1000)
    playPauseBtn.classList = "bx bx-pause-circle"
}

function pause() {
    currentTrack.pause()
    clearInterval(barMoveId)
    barMoveId = null
    playPauseBtn.classList = "bx bx-play-circle"
}

const getDuration = () => {
    let { min, sec } = calcMinSec(currentTrack.duration)
    sec < 10 ? trackDurationDOM.innerHTML = `0${min}:0${sec}` : trackDurationDOM.innerHTML = `0${min}:${sec}`

}

function movingProgressBar() {
    const dur = currentTrack.duration
    const cur = currentTrack.currentTime
    bar.style.width = cur / dur * 100 + "%"
    showCurrentTime()
    getDuration()
    songEnd()
}

function songEnd() {
    isEnded = currentTrack.ended
    if (isEnded) {
        clearInterval(barMoveId)
        barMoveId = null
        playPauseBtn.classList = "bx bx-play-circle"
        nextSong()
        playSong()
    }
}

function showCurrentTime() {
    let { min, sec } = calcMinSec(currentTrack.currentTime)
    sec < 10 ? trackCurrentTimeDOM.innerHTML = `0${min}:0${sec}` : trackCurrentTimeDOM.innerHTML = `0${min}:${sec}`
}

function calcMinSec(prop) {
    let min = Math.floor(prop / 60)
    let sec = Math.floor(prop % 60)
    return { min, sec }
}

progress = document.querySelector(".progress")

progress.addEventListener("click", (e) => {
    const w = progress.clientWidth
    const off = e.offsetX
    const dur = currentTrack.duration
    currentTrack.currentTime = (off / w) * dur
    pause()
    playSong()
})