import { useCallback } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

const fetchList = url => fetch(url).then(r => r.json());
const updateUser = async (url, { arg }) => {
    await removed.add(arg);
};

const removed = new Set();
export const AdvancedList = ({ select }) => {
    let { data, error, isLoading, isValidating, mutate } = useSWR("./data/list.json", fetchList);

    // const { trigger, isMutating } = useSWRMutation('./data/list.json', updateUser);
    // console.log(isMutating)

    const removeUser = useCallback(async (id) => {
        await removed.add(id); 
        mutate({ users: data.users.filter(d => d.id !== id) });
        // mutate(async data => ({ users: data.users.filter(d => d.id !== id) }))
    }, [data, mutate]);

    return <ul className={ isValidating ? "loading" : "" }>
        { error ? <aside role="alert">It's an error { error.message }</aside> : undefined }
        { isLoading ? <li>Is loading from the inside</li> : undefined }
        { data && data.users.filter(a => !removed.has(a.id)).map(
            (a, index) => <Item key={a.id} item={a} index={index} select={select} remove={removeUser} />
        ) }
    </ul>
}

const Item = ({ item, index, remove, select }) => {
    return <li key={item.id}>
        { item.username }
        &nbsp;
        <button onClick={() => select(index)}>Show</button>
        &nbsp;
        <button onClick={() => remove(item.id)}>Remove</button>
    </li>
}