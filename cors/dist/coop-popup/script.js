console.log("Opener", window.opener);
if (window.opener) {
    window.opener.postMessage(`Hello from ${ location }`, "*");
}

let content = document.getElementById("message-content");
window.addEventListener("message", (e) => {
    content.textContent = "Got a message from another window: " + e.data;
});

document.getElementById("popup-window").addEventListener("click", () => {
    let popup = window.open("https://crossorigin.com/referrer", "_blank", "popup");

    console.log("Opened", popup);
    if (popup) {
        setTimeout(() => {
            popup.postMessage(`Hello from Opener ${ location }`, "*");
        }, 1000);
    }
}, false);