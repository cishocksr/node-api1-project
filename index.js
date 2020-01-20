const db = require('./data/db');
const express = require('express');

const server = express();

server.listen(4000, () => {
  console.log('=== server listening on port 4000 ===');
});

server.use(express.json());

// get all users
server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessge: 'The users information could not be retrieved.' });
    });
});

// post user
server.post('/api/users', (req, res) => {
  const usersInfo = req.body;

  if (usersInfo.name && usersInfo.bio) {
    db.insert(usersInfo)
      .then(user => {
        res.status(201).json({ success: true, user });
      })
      .catch(err => {
        res.status(500).json({ success: false, err });
      });
  } else {
    res.status(400).json({
      message: 'Please provide a name and bio for the user'
    });
  }
});

//delete user
server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(deleteUser => {
      if (deleteUser) {
        res.status(204).end();
      } else {
        res.status(404).json({
          errorMessge: 'The user with the specified ID does not exist.'
        });
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessge: 'The user could not be removed' });
    });
});

server.put('/api/user/:id', (req, res) => {
  const id = req.params.id;
  const userInfo = req.body;

  if (!(userInfo.name || userInfo.bio)) {
    return res
      .status(400)
      .json({ message: 'Please provide name and bio for user.' });
  } else {
    db.findById(id)
      .then(user => {
        if (user) {
          return db.update(id, userInfo);
        } else {
          res.status(404).json({
            message: 'The user with the specified ID does not exist.'
          });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ errorMessge: 'The user information could not be modified' });
      });
  }
});
