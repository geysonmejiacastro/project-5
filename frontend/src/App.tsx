import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { Item } from './types';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

function App(): JSX.Element {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get<Item[]>(`${API_URL}/api/items`);
        setItems(res.data ?? []);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch items', err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const addItem = async (data: Omit<Item, 'id'>) => {
    const res = await axios.post<Item>(`${API_URL}/api/items`, data);
    setItems((prev) => [...prev, res.data]);
  };

  const updateItem = async (id: number, data: Omit<Item, 'id'>) => {
    const res = await axios.put<Item>(`${API_URL}/api/items/${id}`, data);
    setItems((prev) => prev.map((it) => (it.id === id ? res.data : it)));
  };

  const deleteItem = async (id: number) => {
    await axios.delete(`${API_URL}/api/items/${id}`);
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '1rem' }}>
      <h1>Item Manager</h1>
      <ItemForm onAdd={addItem} />
      {loading ? <p>Loading...</p> : <ItemList items={items} onUpdate={updateItem} onDelete={deleteItem} />}
    </div>
  );
}

export default App;
