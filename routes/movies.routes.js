const express = require('express');
const Movie = require('../models/Movie');

const router = express.Router();

router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get('/movies/id/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const movie = await Movie.findById(id);
    if (movie) {
      return res.status(200).json(movie);
    } else {
      return res.status(404).json('No movie found by this id');
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get('/movies/title/:title', async (req, res) => {
  const { title } = req.params;
  try {
    const movieByTitle = await Movie.find({ title });
    return res.status(200).json(movieByTitle);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get('/movies/genre/:genre', async (req, res) => {
  const { genre } = req.params;
  try {
    const movieByGenre = await Movie.find({ genre });
    return res.status(200).json(movieByGenre);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get('/movies/year/:year', async (req, res) => {
  const { year } = req.params;
  try {
    const movieByYear = await Movie.find({ year: { $gt: year } });
    return res.status(200).json(movieByYear);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/movies/create', async (req, res, next) => {
    try {
      // Crearemos una instancia de character con los datos enviados
      const newMovie = new Movie({
		title: req.body.title,
    	director:req.body.director,
    	year: req.body.year,
    	genre: req.body.genre,
      });
  
      // Guardamos el personaje en la DB
      const createdMovie = await newMovie.save();
      return res.status(201).json(createdMovie);
    } catch (error) {
          // Lanzamos la función next con el error para que lo gestione Express
      next(error);
    }
  });

router.delete('/movies/delete/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        // No será necesaria asignar el resultado a una variable ya que vamos a eliminarlo
        await Movie.findByIdAndDelete(id);
        return res.status(200).json('Movie deleted!');
    } catch (error) {
        return next(error);
    }
});


module.exports = router;
