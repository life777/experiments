const template = document.createElement('template');
template.innerHTML = `
  <style>
    .row {
      width: 100%;
      height: 4rem;
      border: 1px solid black;
    }
  </style>
  <div class="row">
    <slot></slot>
  </div>`;

class Row extends HTMLElement {
    constructor () {
        super();

        this.shadow = this.attachShadow({ mode: "open" });
        this.shadow.append(template.content.cloneNode(true));
    }
}

customElements.define("my-row", Row);