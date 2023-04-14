import express from "express";
import cors from "cors"

const app = express()
const port = 3000

app.use(cors())

const wait = (timer = 5000) => new Promise((res) => {
    setTimeout(() => {
        res()
    }, timer);
})

app.get('/', (req, res) => {

    res.statusCode = 200;
    res.flushHeaders();

    res.write('<html><head><title>Hello</title></head><body>')
    wait().then(() => {
        res.write('<h1>Hello page</h1><div')
        return wait()
    })
    .then(() => {
        res.write('>This is div</div>')
        return wait()
    })
    .then(() => {
        res.write('<div>One more div</div></body></html>')
        res.end();
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})