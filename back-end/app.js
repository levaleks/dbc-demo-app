const express = require('express');
const cors = require('cors');
const storage = require('./storage');
const { APP_PORT } = require('./config');

const app = express();

/**
 * Tuning
 */

app.use(cors());
app.use(express.json());

/**
 * Routes
 */

app.get('/todos', (req, res) => {
  storage
    .findAll()
    .then((todos) => res.json(todos))
    .catch((error) => console.error(error));
});

app.post('/todos', (req, res) => {
  storage
    .create(req.body.name)
    .then((todo) => res.json(todo))
    .catch((error) => console.error(error));
});

app.delete('/todos/:id', (req, res) => {
  storage
    .deleteById(req.params.id)
    .then(() => res.status(200).json([]))
    .catch((error) => console.error(error));
});

app.put('/todos/:id', (req, res) => {
  storage
    .updateById(req.params.id, { name: req.body.name, done: req.body.done })
    .then(res.status(200).json([]))
    .catch((error) => console.error(error));
});

/**
 * Error handling
 */

app.use((req, res, next) => res.status(404).send({ message: `Route ${req.url} is not found` }));

app.use((err, req, res, next) => res.status(500).send({ error: err.message }));

/**
 * Ignition
 */

app.listen(APP_PORT, () => {
  console.log(`Server is listening port ${APP_PORT}`);
});
