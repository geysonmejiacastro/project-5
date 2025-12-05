import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { query } from './db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

interface Item {
  id: number;
  name: string;
  description: string;
  quantity: number;
}

// READ all items
app.get('/api/items', async (_req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM items ORDER BY id ASC');
    res.json(result.rows as Item[]);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// CREATE item
app.post('/api/items', async (req: Request, res: Response) => {
  try {
    const { name, description, quantity } = req.body as {
      name: string;
      description?: string;
      quantity?: number;
    };

    const result = await query(
      'INSERT INTO items (name, description, quantity) VALUES ($1, $2, $3) RETURNING *',
      [name, description ?? '', quantity ?? 0]
    );

    res.status(201).json(result.rows[0] as Item);
  } catch (err) {
    console.error('Error creating item:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE item
app.put('/api/items/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, quantity } = req.body as {
      name: string;
      description?: string;
      quantity: number;
    };

    const result = await query(
      'UPDATE items SET name = $1, description = $2, quantity = $3 WHERE id = $4 RETURNING *',
      [name, description ?? '', quantity, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json(result.rows[0] as Item);
  } catch (err) {
    console.error('Error updating item:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE item
app.delete('/api/items/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query('DELETE FROM items WHERE id = $1 RETURNING *', [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({ message: 'Item deleted' });
  } catch (err) {
    console.error('Error deleting item:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend (TS) running on http://localhost:${PORT}`);
});
