export class Waiting {
    constructor (
        elt,
        cls = "waiting-elt"
    ) {
        this.elt = elt;
        this.cls = cls;
        this.waiting = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;
    }

    attach (p) {
        this.elt.innerHTML = this.waiting;
        this.elt.classList.add(this.cls);
        p.finally(() => {
            this.elt.classList.remove(this.cls);
            let w = this.elt.querySelector(".lds-ring");
            if (w) {
                w.remove();
            }
        });
        return p;
    }
}