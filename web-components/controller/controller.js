const randomWords = [
    "Serendipity",
    "Quixotic",
    "Mellifluous",
    "Perseverance",
    "Jubilant",
    "Cacophony",
    "Ephemeral",
    "Nebulous",
    "Mellifluous",
    "Resplendent"
];

let search = document.querySelector("my-search");
let list = document.querySelector("my-list");
search.addEventListener("search", e => {
    let value = e.detail.value;
    list.innerHTML = "";
    list.append(randomWords.filter(v => v.includes(value)).reduce((akk, w) => {
        let row = document.createElement("my-row");
        row.textContent = w;
        akk.append(row);
        return akk
    }, document.createDocumentFragment()))
});