export const myUse = (p) => {
    if (p.result === undefined && p.error === undefined) {
        p.then(result => {
            p.result = result;
        }, error => {
            p.error = error
        })
        throw p;
    }

    if (p.error) {
        throw p.error;
    }

    return p.result;
}