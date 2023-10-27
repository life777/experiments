import { template } from "./search_html.js";

class Search extends HTMLElement {
    constructor () {
        super();

        this.shadow = this.attachShadow({ mode: "open" });
        this.shadow.append(template.content.cloneNode(true));

        let input = this.shadow.querySelector("input");
        this.submit = () => {
            this.dispatchEvent(new CustomEvent("search", { detail: { value: input.value } }))
        };
    }

    get value () {
        return this.shadow.querySelector("input").value;
    }

    connectedCallback () {
        this.shadow.querySelector("button").addEventListener("click", this.submit);

        const stylesheet = new CSSStyleSheet();
        stylesheet.replaceSync(`button { border-radius: 5px; }`);
        this.shadow.adoptedStyleSheets = [stylesheet];
    }

    disconnectedCallback () {
        this.shadow.querySelector("button").addEventListener("click", this.submit);
    }

    attributeChangedCallback (name, oldValue, newValue) {
        console.log("Search", name, oldValue, newValue);

        if (name === "value") {
            this.shadow.querySelector("input").value = newValue;
            return;
        }

        if (name === "disabled") {
            this.shadow.querySelector("input").disabled = newValue;
            return;
        }
    }

    static observedAttributes = ["disabled", "value"];
}

customElements.define("my-search", Search);