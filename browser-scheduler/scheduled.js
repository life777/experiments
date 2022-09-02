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
 
    return requestIdleCallback(idle => {
        renderAds(ads);
    }, { timeout: 1000 });
};

const requestAndRenderAdsInfo = () => adsWaiting.attach(loadAdds());
const requestMainInfo = () => waiting.attach(loadContent());
const requestMainContent = (articlers, append) => () => {
    renderArticles(articlers, append);

    scheduler.postTask(renderImages, { priority: "user-visible" });
};

const renderMainContent = ([primary, secondary]) => {
    scheduler.postTask(requestMainContent(primary, false), { priority: "user-blocking" });
    scheduler.postTask(requestMainContent(secondary, true), { priority: "background" });
};


const renderPage = () => {
    scheduler.postTask(requestAndRenderAdsInfo, { priority: "user-visible" });
    scheduler.postTask(requestMainInfo, { priority: "user-blocking" })
        .then(renderMainContent);

    return () => {};
}

renderPage();
window.addEventListener("hashchange", () => {
    renderPage();
});