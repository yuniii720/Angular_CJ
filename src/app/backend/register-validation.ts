import express, { Request, Response } from 'express';
import { ParsedQs } from 'qs';

const app = express();
app.use(express.json()); // Middleware para manejar JSON

interface User {
  id: number;
  email: string;
  password: string;
  username: string;
  name: string;
  lastName: string;
  type: string;
}

const users: User[] = []; // Simulación de base de datos con tipo explícito

app.get('/api/check-username', (req: Request, res: Response) => {
  const baseUsername = typeof req.query['base'] === 'string' ? req.query['base'] : '';
  let username = baseUsername;
  let counter = 1;

  while (users.find(user => user.username === username)) {
    username = `${baseUsername}${counter}`;
    counter++;
  }

  res.json({ available: true, username: username });
});

app.post('/api/register', (req: Request, res: Response) => {
  const { email, password, username, name, lastName, type } = req.body;
  const newUser: User = { id: users.length + 1, email, password, username, name, lastName, type };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
