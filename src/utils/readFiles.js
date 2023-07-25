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

const writeNewInFile = async (newMoviesList) => {
  try {
  const allMovies = JSON.stringify(newMoviesList);
  await fs.writeFile(dirMovies, allMovies);
  } catch (error) {
    console.error(`Erro ao escrever: ${error}`);
  }
};

const updateMovie = async (id, update) => {
  const movies = await readAll();
  const movieToUpdate = await findById(id);

if (movieToUpdate && movieToUpdate.id === id) {
  movies.push({ ...movieToUpdate, ...update });
  await writeNewInFile(movies);
  return { ...movieToUpdate, ...update };
}
return false;
};

module.exports = {
  readAll,
  findById,
  writeNewInFile,
  updateMovie,
};