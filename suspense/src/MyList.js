import { myUse } from "./myUse";

const map = new Map();

const fetchList = (prefix) => {
    if (!map.has(prefix)) {
        map.set(prefix, new Promise(res => {
            setTimeout(() => {
                res(Array.from({ length: 10 }, (_, i) => prefix + i.toString()));
            }, 1000);
        }));
    }

    return map.get(prefix);
}

export const MyList = ({ prefix }) => {
    if (!prefix) {
        return "Empty list";
    }

    console.log(Date.now());
    console.log(prefix, " start loading")
    let a = fetchList(prefix);
    console.log(a);
    let list = myUse(a);

    console.log(prefix, " is loaded")
    return <ul>
        { list.map(a => <li key={a}>{ a }</li>) }
    </ul>
}