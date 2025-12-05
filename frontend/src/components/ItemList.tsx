import * as React from 'react';
type Item = { id: number; name: string; quantity: number; [key: string]: any };
import ItemRow from './ItemRow';

interface Props {
  items: Item[];
  onUpdate: (id: number, data: Omit<Item, 'id'>) => void;
  onDelete: (id: number) => void;
}

export default function ItemList({ items, onUpdate, onDelete }: Props) {
  if (!items || items.length === 0) {
    return <div style={{ padding: 20, color: '#6b7280' }}>No items yet.</div>;
  }

  return (
    <div>
      {items.map((item) => (
        <ItemRow key={item.id} item={item} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
}
