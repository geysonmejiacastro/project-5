import React, { useState } from 'react';
import type { Item } from '../types';

interface Props {
  onAdd: (data: Omit<Item, 'id'>) => Promise<void> | void;
}

export default function ItemForm({ onAdd }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onAdd({ name, description, quantity });
      setName('');
      setDescription('');
      setQuantity(1);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Add failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: 16 }}>
      <div style={{ display: 'grid', gap: 8 }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <input
          type="number"
          value={quantity}
          min={0}
          onChange={(e) => setQuantity(Number(e.target.value || 0))}
          required
        />
        <button type="submit" disabled={loading}>{loading ? 'Adding…' : 'Add Item'}</button>
      </div>
    </form>
  );
}
