import { renderArticlesFn, renderAdsFn, renderImagesFn } from "./renderer.js";
import { getContent, getAds } from "./store.js";
import { Waiting } from "./waiting.js";

let main = document.querySelector(".content");
let waiting = new Waiting(main);
let renderArticles = renderArticlesFn(main);
let renderImages = renderImagesFn(main);
let ads = document.querySelector(".ads");
let adsWaiting = new Waiting(ads);
let renderAds = renderAdsFn(ads);

const renderContent = async () => {
    let page = location.hash.slice(1);
    let articles = await getContent(page);
    renderArticles(articles);
};

const loadAds = async () => {
    let ads = await getAds();
    renderAds(ads);
};

const renderPage = async () => {
    await Promise.all([
        // #1 create waiting
        waiting.attach(renderContent()),

        // #2 load ads 
        adsWaiting.attach(loadAds())
    ]);

    // #3 load images
    renderImages();
}

renderPage();
window.addEventListener("hashchange", () => {
    renderPage();
});