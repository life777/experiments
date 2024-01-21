import useSWR from 'swr';

const fetchList = url => fetch(url).then(r => r.json());
const fetchAddress = ([url, id]) => fetch(url).then(r => r.json()).then(addrs => addrs.filter(addr => addr.id === id)[0]);

export const DependentList = ({ index }) => {
    let { data, error, isLoading } = useSWR(["./data/list.json"], fetchList);
    /* let { data: address, isLoading: isLoadingAddresses } = useSWR(
        () => ["./data/addresses.json", data.users[index].id.toString()],
        fetchAddress,
        { dedupingInterval: 10000 }
    ); */
    let { data: address, isLoading: isLoadingAddresses } = useSWR(
        data ? ["./data/addresses.json", data.users[index].id.toString()] : undefined,
        fetchAddress,
        { dedupingInterval: 10000 }
    );

    console.log(address, isLoadingAddresses);
    return <div>
        { error ? <aside role="alert">It's an error { error.message }</aside> : undefined }
        { isLoading ? <li>Is loading from the inside</li> : undefined }
        {
            data ? <>
                <h3>User {data.users[index].id}</h3>
                <p>{ isLoadingAddresses ? "loading..." : address.address}</p>
            </> : undefined
        }
    </div>
}