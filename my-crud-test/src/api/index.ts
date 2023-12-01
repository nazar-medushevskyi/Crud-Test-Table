import axios from 'axios';
import { Crud } from '../components/types';

const API = 'https://yourtestapi.com/api/posts'

export const fetchData = async () => {
  try {
    const response = await axios.get(API);

    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const deleteItem = async (id: number) => {
  try {
    await axios.delete(`${API}/${id}`);

    return id;
  } catch (err) {
    console.error(`Error deleting post with id ${id}:`, err);

    return null
  }
}

export const createItem = async (newItem: Omit<Crud, 'id'>) => {
  try {
    const { data } = await axios.post(API, newItem);

    return data;
  } catch (err) {
    console.error(`Error creating post:`, err);

    return null
  }
}

export const editItem = async ({ id, ...rest }: Omit<Crud, 'image'>) => {
  try {
    const { data } = await axios.put(`${API}/${id}`, rest);

    return data;
  } catch (err) {
    console.error(`Error creating post:`, err);

    return null
  }
}
