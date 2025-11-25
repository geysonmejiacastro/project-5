import express from 'express';
import { MyType } from './types/index';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());

// Main application logic
app.get('/', (req, res) => {
    res.send('Welcome to Project 5!');
});

// Example route using a type
app.post('/data', (req, res) => {
    const data: MyType = req.body;
    // Process the data...
    res.status(201).send(data);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});