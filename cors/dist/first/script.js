console.log("main script");

// throw new Error("Couldn't parse such a big sum of money on credit card 5231 ...");

/* fetch("http://crossorigin.com/first/data.json")
    .then(res => {
        if (res.ok) {
            console.log("Response is ok");
            return res.json();
        }

        throw new Error("Failed request");
    })
    .then(json => { console.log(json); })
    .catch(err => { console.error(err); }); */

fetch("http://crossorigin.com/first/data.json", {
    headers: {
        "Content-Type": "application/json"
    }
})
    .then(res => {
        if (res.ok) {
            console.log("Response is ok");
            return res.json();
        }

        throw new Error("Failed request");
    })
    .then(json => { console.log(json); })
    .catch(err => { console.error(err); });