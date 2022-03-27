const express = require('express');
const db = require('./db.js') ;

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`);
});

app.get('/api/pidgeons', (req, res) => {
  db.getAll()
    .then(pidgeons => res.send(pidgeons))
    .catch(err => console.log(err))
});

app.post('/api/pidgeons', (req, res) => {
  db.save(req.body)
    .then(() => res.status(201).send('successful post'))
    .catch(err => console.log(err))
})

app.patch('/api/pidgeons', (req, res) => {
  console.log(req.body);
  db.update(req.body)
    .then(() => res.send('patched'))
    .catch(err => console.log(err))
})

app.delete('/api/pidgeons', (req, res) => {
  console.log(req.query);
  db.delete(req.query)
    .then(() => res.send('deleted'))
    .catch(err => console.log(err))
})