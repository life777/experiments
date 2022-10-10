export const getContent = id => {
    return fetch("data.json")
        .then(r => r.json())
        .then(r => r.filter(e => e.id === id)
            .map(a => a.articles)
            .flat()
        )
        .then(wait(700));
};

export const getAds = () => wait(1000)();

let roundRobinNumber = 0;
export const getImage = () => {
    let imgs = ["a1.webp", "a2.jpg", "a3.jpg", "a4.webp"];

    let img = imgs[roundRobinNumber];
    roundRobinNumber = (roundRobinNumber + 1) % imgs.length;

    return fetch(`./img/${ img }`)
        .then(r => r.blob())
        .then(b => URL.createObjectURL(b))
        .then(wait(1000));
};

const wait = timer => res => new Promise(r => {
    setTimeout(() => {
        r(res);
    }, timer);
})