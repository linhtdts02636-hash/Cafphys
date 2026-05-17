const chat = document.getElementById("chat-window");
const chatButton = document.getElementById("chatButton");
const closeButton = document.getElementById("close-button");

chatButton.addEventListener("click", () => {
    if (chat.classList.contains("hidden")){
        chat.classList.remove("hidden");
        chatButton.classList.add("lower");
        chat.classList.add("is-animated");
        chat.classList.remove("is-animated-outro");
    } else {
        chat.classList.remove("is-animated");
        chat.classList.add("is-animated-outro");
        setTimeout(() => {
            chat.classList.add("hidden");
           chatButton.classList.remove("lower");
        }, 470)

    }
    beepSound()

})

closeButton.addEventListener("click", () => {
    chat.classList.remove("is-animated");
    chat.classList.add("is-animated-outro");
    console.log ("clicked");
    beepSound()

    setTimeout(() => {
        chat.classList.add("hidden");
        chatButton.classList.remove("lower");
    }, 470)



})










