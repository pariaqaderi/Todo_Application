import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/todos/';

export const getTodos = () => axios.get(API_URL);
export const createTodo = (data: any) => axios.post(API_URL, data);
export const updateTodo = (id: number, data: any) => axios.put(`${API_URL}${id}/`, data);
export const deleteTodo = (id: number) => axios.delete(`${API_URL}${id}/`);