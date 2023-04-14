var here = document.getElementById("here");

fetch("http://localhost:3000")
    .then((response) => {
        let reader = response.body.getReader();
        let decoder = new TextDecoder();
        let read = () => {
            return reader.read().then(({ done, value }) => {
                // debugger;
                here.innerHTML += decoder.decode(value);
                if (done) {
                    return;
                }

                return read();
            });
        };

        return read();
    });