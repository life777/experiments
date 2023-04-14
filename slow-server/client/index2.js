var here = document.getElementById("here");

fetch("http://localhost:3000")
    .then((response) => {
        let reader = response.body.getReader();
        let decoder = new TextDecoder();

        let doc = document.implementation.createHTMLDocument();
        doc.write("<div>");
        here.append(doc.body.firstChild);

        let read = () => {
            return reader.read().then(({ done, value }) => {
                doc.write(decoder.decode(value));
                if (done) {
                    return;
                }

                return read();
            });
        };

        return read();
    });