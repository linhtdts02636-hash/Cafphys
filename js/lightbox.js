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
let clickPower = 1;

items.forEach(item => {
    item.addEventListener("click", () => {
        const img = item.querySelector("img").src;
        const title = item.querySelector("h4").innerText;
        const price = Number(item.dataset.price)
        const value = Number(item.dataset.value)
        const type = item.dataset.type;
        const boost = Number(item.dataset.boost);
        selectedClickPower = boost
        selectedPrice = price;
        selectedValue = value;
        selectedType = type;

        lightboxImg.src = img;
        lightboxTitle.textContent = title;
        lightboxPrice.textContent = price;


        lightbox.classList.add("active");
    });
});

function closeLightbox() {
    lightbox.classList.remove("active");
}

closeBtn.addEventListener("click", closeLightbox);
overlay.addEventListener("click", closeLightbox);

buyBtn.addEventListener("click", () => {
        if (currency < selectedPrice) {
            clickSound();
            return;
        }


        if (selectedType === "energy") {
            energy = Math.min (energy + selectedValue, maxEnergy);
        }

        if (selectedType === "booster") {
            clickPower+=selectedClickPower;
            currency+=clickPower;
        }

        currency -= selectedPrice;
        updateHUD();
        beepSound();
    })