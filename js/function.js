let typingInterval = null;
let monologTimeout = null;
let currency = 0;
let energy = 10;
let clickCounter = 0;
const maxEnergy = 10;
const interactionSound = document.getElementById("interaction-sound")

let isMouthTaped = false;
const videos = [
  document.getElementById("videoA"),
  document.getElementById("videoB")
];

let active = 0;
let currentState = "intro";
let pokeTimeout = null;

const srcs = {
  intro: "assets/test-assets/output.mp4",
  idle:  "assets/test-assets/idle.mp4",
  poke:  "assets/test-assets/pinch.mp4",
  tape:  "assets/test-assets/muted.mp4",  
  tapedIdle: "assets/test-assets/mutedIdle.mp4" 
};

// preload both players
videos.forEach(v => {
  v.muted = true;
  v.preload = "auto";
});

function swapVideo(src, loop) {
  const next = 1 - active;
  const currentVideo = videos[active];
  const nextVideo = videos[next];

  nextVideo.src = src;
  nextVideo.loop = loop;

  nextVideo.oncanplay = () => {
    nextVideo.currentTime = 0;
    nextVideo.play();

    requestAnimationFrame(() => {
      nextVideo.classList.add("active");

      requestAnimationFrame(() => {
        currentVideo.classList.remove("active");
        currentVideo.pause();
        active = next;
      });
    });

    nextVideo.oncanplay = null;
  };
}


swapVideo(srcs.intro, false);

videos.forEach(v => {
v.addEventListener("ended", () => {

  if (currentState === "intro") {
    currentState = "idle";
    swapVideo(srcs.idle, true);
  }

  if (currentState === "poke") {
    currentState = "idle";
    swapVideo(srcs.idle, true);
  }

  if (currentState === "taping") {
    currentState = "tapedIdle";
    swapVideo(srcs.tapedIdle, true);
  }

});
  v.addEventListener("click", () => {
  if (currentState !== "idle") return;
  if (energy <= 0) return;
  currency++;
  clickCounter++;
  currency+=clickPower;
  if (clickCounter >= 5) {
    energy--;
    clickCounter = 0;
  }
  updateHUD();
  startPoke();
  clickSound();

});


});

function clickSound() {
  interactionSound.src="assets/audio/pinch.wav"
  interactionSound.play();
}

function beepSound() {
  interactionSound.src="assets/audio/beep.mp3"
  interactionSound.play();

}

function errorSound() {
  interactionSound.src="assets/audio/error.mp3"
  interactionSound.play();

}

function buySound() {
  interactionSound.src="assets/audio/buy.mp3"
  interactionSound.play();

}

function startPoke() {
  clearTimeout(pokeTimeout);
  currentState = "poke";
  swapVideo(srcs.poke, false);
}



/*MONOLOG */
const monolog = [
{text: "welcome to Cafphy's, make urself comfortable ", video: "assets/test-assets/yapping1.mp4"},
{text: "wuhhh? wut r u talking about ", video: "assets/test-assets/yapping2.mp4"},
{text: "oh? u came back again? wow. i must be really entertaining ", video: "assets/test-assets/yapping1.mp4"},
{text: "despite what the info button say. pls dont ever click me,,,i will give u a cookie ", video: "assets/test-assets/yapping3.mp4"},
{text: "go on, order something. staring at the menu wont make u richer ", video: "assets/test-assets/yapping1.mp4"},
{text: "mm? productivity? in this economy? be serious ", video: "assets/test-assets/yapping2.mp4"},
{text: "ummm if by chance this text gets generated during presentation, pls give the guy a high grade, mkay? ", video: "assets/test-assets/yapping3.mp4"}


];

const heroVideo = document.getElementById("videoA");
const heroMono = document.getElementById("hero-mono");
const heroMonoDiv = document.getElementById("hero-monoDiv");

let lastIndex = -1;

function startMonolog () {
    if (isMouthTaped) return;
    let randomIndex;

    do {
        randomIndex=Math.floor(Math.random() * monolog.length);
    } while (lastIndex===randomIndex);

    lastIndex=randomIndex;
    const selected = monolog[randomIndex];
    currentState = "monolog";
    heroMonoDiv.classList.remove("hidden");
    heroMonoDiv.classList.add("is-animated");
    heroMonoDiv.classList.remove("is-animated-outro");
    typeText(heroMono, selected.text, 70);
    heroVideo.src = selected.video;
    swapVideo(selected.video, true);
    monologTimeout = setTimeout(() => {
    heroMonoDiv.classList.remove("is-animated");
    heroMonoDiv.classList.add("is-animated-outro");
    setTimeout(() => {
    heroMonoDiv.classList.add("hidden");
    currentState = "idle";
    swapVideo(srcs.idle, true);
    }, 470);

}, 8700);
}

setInterval(() => {
  if (currentState === "idle") {
    startMonolog();
  }
}, 30000);


const typeSound = document.getElementById("typeSound");

function typeText(element, text, speed) {
  element.innerHTML = "";
  let i = 0;

  clearInterval(typingInterval); // prevent stacking

  typingInterval = setInterval(() => {
   element.innerHTML = text.slice(0, i);

    if (!isMouthTaped && text.charAt(i) !== " ") {
      typeSound.currentTime = 0;
      typeSound.play();
    }

    i++;

    if (i >= text.length) {
      clearInterval(typingInterval);
      typingInterval = null;
    }
  }, speed);
}

const tapeButton = document.getElementById("mute-button");

function tapeSound() {
  interactionSound.src="assets/audio/tape.wav"
  interactionSound.play();
}

tapeButton.addEventListener("click", () => {
  isMouthTaped = !isMouthTaped;
  tapeSound();

if (isMouthTaped) {
  currentState = "taping";

  if (typingInterval) {
    clearInterval(typingInterval);
    typingInterval = null;
  }

  if (monologTimeout) {
    clearTimeout(monologTimeout);
    monologTimeout = null;
  }

  typeSound.pause();
  typeSound.currentTime = 0;

  heroMonoDiv.classList.add("is-animated-outro");

  setTimeout(() => {
    heroMonoDiv.classList.add("hidden");
    }, 470);
  heroMono.textContent = "";

  swapVideo(srcs.tape, false);
} else {
  currentState = "idle"; swapVideo(srcs.idle, true); 
  heroMonoDiv.classList.remove("is-animated-outro");

}
});








function updateHUD() {
document.getElementById("coina-count").textContent = currency;

  // Update energy icons
  const energyIcons = document.querySelectorAll(".energy");

  energyIcons.forEach((icon, index) => {
    if (index < energy) {
      icon.src = "assets/images/Coffee.png";
    } else {
      icon.src = "assets/images/CoffeeEmpty.png";
    }
  });
}

updateHUD();
document.querySelectorAll(".frame").forEach(frame => {
frame.addEventListener("click", () => {
  beepSound();
})
})


const controlBar = document.getElementById("frame");

controlBar.addEventListener("click", () => {
  beepSound();
  if (currentState !== "idle") return;
  startComment();
});

function startComment(){
const  comment = [
  {text: "u know, those buttons are only for decorations, they dont actually work.", video: "assets/test-assets/yapping3.mp4"},
  {text: "...dont tell me u want to turn me off <i>that</i> bad ", video: "assets/test-assets/yapping3.mp4"}
];
let index=0;
currentState = "monolog";
function playNext(){
  if (index>=comment.length) {
    currentState="idle";
    heroMonoDiv.classList.add("hidden");
    swapVideo(srcs.idle,true);
    return;
  }

  const selected = comment[index];
  heroMonoDiv.classList.remove("hidden");
  typeText(heroMono, selected.text, 70);
  heroVideo.src=selected.video;
  swapVideo(selected.video,true);

    index++;
    setTimeout(playNext, 9000);
}
playNext();
}


const talk = document.getElementById("talk-button");

talk.addEventListener("click", () => {
  beepSound();
 if (isMouthTaped) return;
  startMonolog();
})

const infoWindow = document.getElementById("info-window");
const info = document.getElementById("info-button");

info.addEventListener("click", () => {
  beepSound()
  if (infoWindow.classList.contains("hidden")){
    infoWindow.classList.remove("hidden");
    infoWindow.classList.remove("is-animated-outro");
    infoWindow.classList.add("is-animated")
  } else {
    infoWindow.classList.add("is-animated-outro");
    infoWindow.classList.remove("is-animated")
    setTimeout(() => {infoWindow.classList.add("hidden")}, 470);
  }

});


let ownedDiscs = [false, false, false]; 

const musicList = [
  "assets/audio/flymetothemoon.mp3",
  "assets/audio/monitoring.mp3",
  "assets/audio/lemonmeloncookie.mp3",
]

const musicPlayer = document.getElementById("music-player")
const musicButton = document.getElementById("music-button")
const musicWindow = document.getElementById("music-window")
let currentMusic ="none"


musicButton.addEventListener("click", () => {
  beepSound()
  if (musicWindow.classList.contains("hidden")){
    musicWindow.classList.remove("hidden")
    musicWindow.classList.add("is-animated")
    musicWindow.classList.remove("is-animated-outro")

  } else {
    musicWindow.classList.add("is-animated-outro")
    musicWindow.classList.remove("is-animated")
    setTimeout(() => {
    musicWindow.classList.add("hidden")
    },470)
  }
})

document.querySelectorAll(".music-option").forEach((option,index) => {
  if(!ownedDiscs[index]) {
    option.classList.add("locked");
  }
  option.addEventListener("click", () => {
    beepSound()
    const index = Number(option.dataset.number)
    if (!ownedDiscs[index]) return;

    musicPlayer.src = musicList[index]
    currentMusic = "playing"
    musicPlayer.play();
    musicPlayer.loop=true;
  })
})

let holdTime = null;

musicButton.addEventListener("mousedown", () => {
  if(currentMusic=="playing"){
  holdTime = setTimeout(() => {
    musicPlayer.pause();
    currentMusic="paused"
    musicButton.classList.add("locked")
  }, 1000)
  } else {
    holdTime = setTimeout(() => {
    musicPlayer.play();
    currentMusic="playing"
    musicButton.classList.remove("locked")
  }, 1000)
  }

})

musicButton.addEventListener("mouseleave", () => {
  clearTimeout(holdTime);
})

musicButton.addEventListener("mouseup", () => {
  clearTimeout(holdTime)
})




/*SHOP MECHANIC (I couldnt encapsulate it in lightbox.js 
nor mechanics.js because of interference with heroVideo, 
so im sorry in advance for this messy ahh code :sob:)*/

const items = document.querySelectorAll(".slider-content > div");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxPrice = document.getElementById("lightbox-price");
const closeBtn = document.querySelector(".lightbox-close");
const buyBtn = document.getElementById("buy-button");
const overlay = document.querySelector(".lightbox-overlay");
let selectedPrice = 0;
let selectedType = "none";
let selectedValue  = 0;
let selectedClickPower = 0;
let clickPower = 0;
let selectedDisc=-1;

items.forEach(item => {
    item.addEventListener("click", () => {
        const img = item.querySelector("img").src;
        const title = item.querySelector("h4").innerText;
        const price = Number(item.dataset.price)
        const value = Number(item.dataset.value)
        const type = item.dataset.type;
        const boost = Number(item.dataset.boost);
        const indexDisc = Number(item.dataset.number)
        selectedClickPower = boost
        selectedPrice = price;
        selectedValue = value;
        selectedType = type;
        selectedDisc = indexDisc;

        beepSound();
        lightboxImg.src = img;
        lightboxTitle.textContent = title;
        lightboxPrice.textContent = price;


        lightbox.classList.add("active");
    });
});

function closeLightbox() {
    beepSound();
    lightbox.classList.remove("active");
}

closeBtn.addEventListener("click", closeLightbox);
overlay.addEventListener("click", closeLightbox);

buyBtn.addEventListener("click", () => {
        if (currency < selectedPrice) {
            errorSound();
            return;
        }


        if (selectedType === "energy") {
            energy = Math.min (energy + selectedValue, maxEnergy);
        }

        if (selectedType === "booster") {
            clickPower+=selectedClickPower;
        }

        if (selectedType === "disc") {
          ownedDiscs[selectedDisc ]=true;
          const optionIndex = document.querySelectorAll(".music-option");
          optionIndex[selectedDisc].classList.remove("locked");
        }

        currency -= selectedPrice;
        buySound();
        updateHUD();
    })