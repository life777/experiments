import useSWR from 'swr';

const fetchList = (prefix) => {
    return new Promise(res => {
        setTimeout(() => {
            res(Array.from({ length: 10 }, (_, i) => prefix + i.toString()));
        }, 1000);
    });
}

export const AnotherList = ({ prefix }) => {
    console.log(prefix, " start loading")
    let { data, error, isLoading } = useSWR("/list", fetchList);

    console.log(prefix, " is loaded")
    return <ul>
        { error ? <aside role="alert">It's an error { error }</aside> : undefined }
        { isLoading ? <li>Is loading from the inside</li> : undefined }
        { data && data.map(a => <li key={a}>{ a }</li>) }
    </ul>
}