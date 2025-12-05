import express, { Request, Response } from 'express';
import type { MyType } from './types';

const app = express();
const PORT = parseInt(process.env.PORT ?? '3000', 10);

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to Project 5!');
});

// Basic runtime guard — update field checks to match your MyType shape
function isMyType(obj: any): obj is MyType {
  return obj && typeof obj === 'object' && ('id' in obj || 'name' in obj);
}

app.post('/data', (req: Request<{}, {}, MyType>, res: Response) => {
  const data = req.body;
  if (!isMyType(data)) return res.status(400).json({ error: 'Invalid payload' });
  res.status(201).json(data);
});

// export app for tests; start server when run directly
export default app;

if (require.main === module) {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on http://localhost:${PORT}`);
  });
}