const videoCafe = document.getElementById("videoCafe");
const cafe1Src = "assets/test-assets/scenery.mp4";
const cafe2Src = "assets/test-assets/scenery1.mp4";
const cafe3Src = "assets/test-assets/scenery2.mp4";



videoCafe.src = cafe1Src;
videoCafe.loop = true;
videoCafe.play();



const mapButton = document.getElementById("map-button");
const map = document.getElementById("map-window-main");

mapButton.addEventListener("click", () => {
    if (map.classList.contains("hidden")) {
        map.classList.remove("hidden");
        mapButton.classList.add("lower");
        map.classList.add("is-animated");
        map.classList.remove("is-animated-outro");
    } else {
        map.classList.remove("is-animated");
        map.classList.add("is-animated-outro");
        setTimeout(() => {
            map.classList.add("hidden");
            mapButton.classList.remove("lower");
        }, 470)

    }
    beepSound();

})




const cafePoint = document.getElementById("cafe-point");
const cafeMark = document.getElementById("cafe-mark");
const mountPoint = document.getElementById("mount-point");
const mountMark = document.getElementById("mount-mark");
const woodPoint = document.getElementById("wood-point");
const woodMark = document.getElementById("wood-mark");
const loadingScreen = document.getElementById("loading-screen-main");


let currentPosition = "cafe";

mountPoint.addEventListener("click", () => {
    if (currentPosition == "mount") return;
    currentPosition = "mount";
    map.classList.remove("is-animated");
    map.classList.add("is-animated-outro");


    setTimeout(() => {
        map.classList.add("hidden");
        mapButton.classList.remove("lower");
        cafeMark.classList.add("hidden");
        woodMark.classList.add("hidden");
        mountMark.classList.remove("hidden");
    }, 470);
    loading();
    setTimeout(() => {
        videoCafe.src = cafe2Src;
        videoCafe.loop = true;
        videoCafe.play();
    }, 2000)

})

cafePoint.addEventListener("click", () => {
    if (currentPosition == "cafe") return;
    currentPosition = "cafe";
    map.classList.remove("is-animated");
    map.classList.add("is-animated-outro");


    setTimeout(() => {
        map.classList.add("hidden");
        mapButton.classList.remove("lower");
        cafeMark.classList.remove("hidden");
        woodMark.classList.add("hidden");
        mountMark.classList.add("hidden");
    }, 470);
    loading();
    setTimeout(() => {
        videoCafe.src = cafe1Src;
        videoCafe.loop = true;
        videoCafe.play();
    }, 2000)

})

woodPoint.addEventListener("click", () => {
    if (currentPosition == "wood") return;
    currentPosition = "wood";
    map.classList.remove("is-animated");
    map.classList.add("is-animated-outro");


    setTimeout(() => {
        map.classList.add("hidden");
        mapButton.classList.remove("lower");
        cafeMark.classList.add("hidden");
        woodMark.classList.remove("hidden");
        mountMark.classList.add("hidden");
    }, 470);
    loading();
    setTimeout(() => {
        videoCafe.src = cafe3Src;
        videoCafe.loop = true;
        videoCafe.play();
    }, 2000)

})




function loading() {
    loadingScreen.classList.remove("hidden");
    loadingScreen.classList.add("is-animated");
    loadingScreen.classList.remove("is-animated-outro");
    walkingSound(5000)

    setTimeout(() => {
        loadingScreen.classList.add("is-animated-outro");
        loadingScreen.classList.remove("is-animated")
        setTimeout(() => {
            loadingScreen.classList.add("hidden");
        }, 470);
    }, 5000)

}

function walkingSound() {
    interactionSound.src = "assets/audio/walking.wav"
    interactionSound.play();
}

