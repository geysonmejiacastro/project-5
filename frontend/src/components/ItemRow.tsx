import React, { useState } from "react";
import type { Item } from "../types";

interface Props {
  item: Item;
  onUpdate: (id: number, data: Omit<Item, "id">) => void;
  onDelete: (id: number) => void;
}

export default function ItemRow({ item, onUpdate, onDelete }: Props) {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description ?? "");
  const [quantity, setQuantity] = useState<number>(item.quantity);

  const saveChanges = () => {
    onUpdate(item.id, { name, description, quantity });
    setEdit(false);
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "0.5rem", margin: "0.5rem 0", borderRadius: 6 }}>
      {edit ? (
        <>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" /><br />
          <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" /><br />
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value || 0))}
            min={0}
          /><br />
          <button onClick={saveChanges} style={{ marginRight: 8 }}>Save</button>
          <button onClick={() => setEdit(false)}>Cancel</button>
        </>
      ) : (
        <>
          <strong>{item.name}</strong> (Qty: {item.quantity})<br />
          <span style={{ color: "#6b7280" }}>{item.description}</span><br />
          <button onClick={() => setEdit(true)} style={{ marginRight: 8 }}>Edit</button>
          <button onClick={() => onDelete(item.id)}>Delete</button>
        </>
      )}
    </div>
  );
}
