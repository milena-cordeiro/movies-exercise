const express = require('express');
const { readAll, findById } = require('./utils/readFiles');

const app = express();

app.use(express.json());

app.get('/movies', async (req, res) => {
try {
  const allMovies = await readAll();

  res.status(200).json(allMovies);
} catch (error) {
  res.status(500).json({ message: error.message });
}
});

app.get('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await findById(Number(id));

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = app;