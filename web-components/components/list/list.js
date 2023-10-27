const template = document.createElement('template');
template.innerHTML = `
  <style>
    .list {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  </style>
  <div class="list">
    <div class="header">
        <slot name="header"></slot>
    </div>
    <div class="main">
        <slot></slot>
    </div>
    <div class="footer">
        <slot name="footer"></slot>
    </div>
  </div>`;

class List extends HTMLElement {
    constructor () {
        super();

        this.shadow = this.attachShadow({ mode: "open" });
        this.shadow.append(template.content.cloneNode(true));
    }
}

customElements.define("my-list", List);