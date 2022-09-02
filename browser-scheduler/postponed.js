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

const postponeRenderImages = () => {
    // #3 load images
    return requestIdleCallback(idle => {
        renderImages();
    }, { timeout: 1000 });
}

const renderPage = async () => {
    let [[primary, secondary], adsHandler] = await Promise.all([
        // #1 create waiting
        waiting.attach(loadContent()),

        // #2 load ads 
        adsWaiting.attach(loadAdds())
    ]);

    // #1 render primary
    renderArticles(primary);
    let handlerImg = postponeRenderImages();

    let secondPartHandler = requestIdleCallback(idle => {
        console.log(idle.didTimeout)
        console.log(idle.timeRemaining())

        renderArticles(secondary, true);
        // #3 load images
        renderImages();
    }, { timeout: 1000 });

    return () => {
        cancelIdleCallback(handlerImg);
        cancelIdleCallback(secondPartHandler);
        cancelIdleCallback(adsHandler);
    };
}

renderPage();
window.addEventListener("hashchange", () => {
    renderPage();
});