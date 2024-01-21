import useSWR from 'swr';

const fetchList = url => fetch(url).then(r => r.json());

export const List = () => {
    let { data, error, isLoading } = useSWR("./data/list.json", fetchList, { revalidateOnFocus: true });

    console.log(data, error, isLoading);
    return <ul>
        { error ? <aside role="alert">It's an error { error.message }</aside> : undefined }
        { isLoading ? <li>Is loading from the inside</li> : undefined }
        { data && data.users.map(a => <li key={a.id}>{ a.username }</li>) }
    </ul>
}