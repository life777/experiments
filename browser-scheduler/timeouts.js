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

const loadContent = async () => {
    let page = location.hash.slice(1);
    let articles = await getContent(page);
    let mainArt = articles.slice(0, 3);
    let secondary = articles.slice(3);

    return [mainArt, secondary];
};


const loadAdds = async () => {
    let ads = await getAds();

    let timer = setTimeout(() => {
        renderAds(ads);
    }, 1);

    return () => {
        clearTimeout(timer);
    };
};

const renderPage = async () => {
    let [[primary, secondary], ads] = await Promise.all([
        // #1 create waiting
        waiting.attach(loadContent()),

        // #2 load ads 
        adsWaiting.attach(loadAdds())
    ]);

    // #1 render primary
    renderArticles(primary);
    renderImages();

    let timer = setTimeout(() => {
        renderArticles(secondary, true);
        // #3 load images
        renderImages();
    }, 1);

    return () => {
        clearTimeout(timer);
    };
}

renderPage();
window.addEventListener("hashchange", () => {
    renderPage();
});