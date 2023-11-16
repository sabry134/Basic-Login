const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();
const port = 3000;

dotenv.config();

app.use(bodyParser.json());

const accounts = [
  { username: 'user1', password: process.env.USER1_PASSWORD },
  { username: 'user2', password: process.env.USER2_PASSWORD },
  { username: 'user3', password: process.env.USER3_PASSWORD },
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Both username and password are required.' });
  }

  const userAccount = accounts.find((account) => account.username === username);

  if (userAccount && userAccount.password === password) {
    return res.json({ message: 'Login successful!' });
  } else {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
