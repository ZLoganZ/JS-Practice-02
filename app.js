const express = require('express');
const fs = require('fs');

// {
//   "username": "anle",
//   "fullname": "Le Dang Hoang An",
//   "role": "Developer",
//   "project": ["D&D", "Tiger"],
//   "activeYn": "Y"
// }
const listUsers = JSON.parse(fs.readFileSync('users.json', 'utf8'));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (_, res) => {
  res.send('Hello World');
});

app.get('/user', (req, res) => {
  const query = req.query;
  const users = listUsers.filter((user) => {
    for (const key in query) {
      if (user[key] !== query[key]) {
        return false;
      }
    }
    return true;
  });
  res.send(users);
});

app.post('/user', (req, res) => {
  const user = req.body;
  const isExist = listUsers.some((u) => u.username.toString() === user.username.toString());
  if (isExist) {
    res.status(400).send('User already exist');
  } else {
    listUsers.push(user);
    fs.writeFileSync('users.json', JSON.stringify(listUsers));
    res.send(user);
  }
});

app.patch('/user/:id', (req, res) => {
  const user = listUsers.find((user) => user.username.toString() === req.params.id.toString());
  if (!user) {
    res.status(404).send('User not found');
  } else {
    const body = req.body;
    for (const key in body) {
      user[key] = body[key];
    }
    listUsers[listUsers.indexOf(user)] = user;
    fs.writeFileSync('users.json', JSON.stringify(listUsers));
    res.send(user);
  }
});

app.delete('/user/:id', (req, res) => {
  const user = listUsers.find((user) => user.username.toString() === req.params.id.toString());
  if (!user) {
    res.status(404).send('User not found');
  } else {
    const index = listUsers.indexOf(user);
    listUsers.splice(index, 1);
    fs.writeFileSync('users.json', JSON.stringify(listUsers));
    res.send(user);
  }
});

const PORT = 3456;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
