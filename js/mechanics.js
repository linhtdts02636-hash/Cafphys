let clickCounter = 0;
const maxEnergy = 10;

function updateHUD() {
  document.getElementById("coina-count").textContent = currency;

  const energyIcons = document.querySelectorAll(".energy");

  energyIcons.forEach((icon, index) => {
    if (index < energy) {
      icon.src = "assets/ui/energy_full.png";
    } else {
      icon.src = "assets/ui/energy_empty.png";
    }
  });
}

updateHUD();

v.addEventListener("click", () => {
  if (currentState !== "idle") return;
  if (energy <= 0) return;

  currency++;
  clickCounter++;

  if (clickCounter >= 10) {
    energy--;
    clickCounter = 0;
  }

  updateHUD();
  startPoke();
});




