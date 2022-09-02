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

let cache = new Map();

const loadContent = async () => {
    let page = location.hash.slice(1);
    if (cache.has(page)) {
        return cache.get(page);
    }

    let articles = await getContent(page);
    let mainArt = articles.slice(0, 3);
    let secondary = articles.slice(3);

    cache.set(page, [mainArt, secondary]);

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

const renderMainContent = signal => ([primary, secondary]) => {
    scheduler.postTask(requestMainContent(primary, false), { priority: "user-blocking", signal });
    scheduler.postTask(requestMainContent(secondary, true), { priority: "background", signal });
};


const renderPage = () => {
    let adsTaskController = new TaskController({ priority: "user-visible" });
    scheduler.postTask(requestAndRenderAdsInfo, { signal: adsTaskController.signal });

    let mainContentTaskController = new TaskController({ priority: "user-blocking" });
    let mainContentRenderController = new TaskController();
    scheduler.postTask(requestMainInfo, { signal: mainContentTaskController.signal })
        .then(renderMainContent(mainContentRenderController.signal));

    return () => {
        adsTaskController.abort();
        mainContentRenderController.abort();

        mainContentTaskController.setPriority("background");
    };
}

let unsubscribe = renderPage();
window.addEventListener("hashchange", () => {
    unsubscribe();

    unsubscribe = renderPage();
});