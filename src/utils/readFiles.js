const fs = require('fs/promises');
const path = require('path');

const dirMovies = path.resolve(__dirname, '../movies.json');

const readAll = async () => {
  const moviesFile = await fs.readFile(dirMovies, 'utf8');
  const moviesList = JSON.parse(moviesFile);

  return moviesList;
};

const findById = async (id) => {
  const moviesFile = await fs.readFile(dirMovies, 'utf8');
  const moviesList = JSON.parse(moviesFile);

  const filterById = moviesList.find((m) => m.id === id);

  return filterById;
};

module.exports = {
  readAll,
  findById,
};