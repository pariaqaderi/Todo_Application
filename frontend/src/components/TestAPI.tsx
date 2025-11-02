import { useEffect } from 'react';
import { getTodos } from '../api/todos';


export const TestAPI = () => {
    useEffect(() => {
        getTodos()
        .then(res => {
            console.log('Todos fetched:', res.data)
        })
        .catch(err => {
            console.error('error fetching todos:', err)
        })
    }, [])

    return <div>check the concole for API output</div>
}