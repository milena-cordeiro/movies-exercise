const express = require('express');
const { readAll, findById, writeNewInFile, updateMovie } = require('./utils/readFiles');

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

app.post('/movies', async (req, res) => {
  try {
    const { movie, price } = req.body;
    const moviesList = await readAll();
    const newMovieId = moviesList.length + 1;
    const newMovie = { id: newMovieId, movie, price };

    moviesList.push(newMovie);

    await writeNewInFile(moviesList);

    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ message: 'algo não está certo' });
  }
});

app.put('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { movie, price } = req.body;
    const movieUpdated = await updateMovie(Number(id), { movie, price });

    res.status(200).json(movieUpdated);
  } catch (error) {
    res.status(400).json({ message: 'algo de errado deu ai' });
  }
});

app.delete('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const moviesList = await readAll();
  
    const filterMovies = moviesList.filter((m) => m.id !== Number(id));

    await writeNewInFile(filterMovies);

    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: 'não funcionou' });
  }
});

module.exports = app;