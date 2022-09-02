import { getImage } from "./store.js";
import { Waiting } from "./waiting.js";

export const renderArticlesFn = elt => (as, addToExisting) => {
    if (as.length === 0) {
        as = [{ title: "No Content", content: "We can't find any articles for you" }]
    }


    let html = as
        .map(({ title, content }) => `
            <article class="article">
                <div class="article-img"></div>
                <h2 class="article-title">${ title }</h2>
                <p class="artile-content">${ content }</p>
            </article>
        `.trim())
        .join("");

    if (addToExisting) {
        elt.insertAdjacentHTML("beforeend", html);
        return;
    }

    elt.innerHTML = html;
};

export const renderAdsFn = elt => () => {
    elt.innerHTML = `
        <div class="ad">Cool ad 1</div>
        <div class="ad">Cool ad 2</div>
        <div class="ad">Cool ad 3</div>
        <div class="ad">Cool ad 4</div>
    `.trim();
}

export const renderImagesFn = elt => () => {
    return Promise.all(
        [...elt.getElementsByClassName("article-img")]
            .map(async img => {
                let w = new Waiting(img, "cls");
                let url = await w.attach(getImage());
                img.innerHTML = `<img src="${ url }">`;
            })
    );
};