// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const bodyParser = require('body-parser')

const Celebrity = require('../models/Celebrity.model.js')
const Movie = require('../models/Movie.model.js')
router.use(bodyParser.urlencoded({ extended: true}));


router.get('/create', (req,res) => {

Celebrity.find()
    .then( allCelebrities =>{
    res.render('./movies/new-movie', { allCelebrities })
  })
  .catch(error => console.log(error))

  })



router.post('/create', (req, res) => {
    const { title, genre, plot, cast } = req.body

    Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect('/'))
    .catch(error => res.redirect('/movies/create'))
})


router.get('/', (req,res) => {
    Movie.find()
    .then( allMovies =>{
        res.render('./movies/movies', { allMovies })
    
    })
    .catch(error => console.log(error))
    
      })


router.get('/:id', (req, res) => {
    const  {movieId}  = req.params 
    console.log("Movie ID", {movieId})

        Movie.findOne({_id: movieId}) 
        .populate('cast') 
        .then((movie) =>{ 
            console.log('movie:', movie)
            res.render('./movies/movie-details', movie)

})
.catch(error => console.log(error))
})



module.exports = router;
