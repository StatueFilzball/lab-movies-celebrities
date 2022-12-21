// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const bodyParser = require('body-parser')

const Celebrity = require('../models/Celebrity.model.js')
const Movie = require('../models/Movie.model.js')
router.use(bodyParser.urlencoded({ extended: true }));


router.get('/create', (req, res) => {

    Celebrity.find()
        .then(allCelebrities => {
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


router.get('/', (req, res) => {
    Movie.find()
        .then(allMovies => {
            res.render('./movies/movies', { allMovies })

        })
        .catch(error => console.log(error))

})


router.get('/:id', (req, res) => {
    const { id } = req.params

    Movie.findOne({ _id: id }) 
    // we are looking by ID, better use .findById method so you just need to pass id as property
        .populate('cast')
        .then((movie) => {
            res.render('./movies/movie-details', movie)

        })
        .catch(error => console.log(error))
})

router.post('/:id/delete', (req, res) => {
    const { id } = req.params;

    Movie.findByIdAndDelete(id)
        .then(() => res.redirect('/movies'))
        .catch(error => console.log(error))
})


router.get('/:id/edit', (req, res) => {
    const { id } = req.params

    // to pre-fill the form we need the data of the movie (we have the id) and the list of all the celebrities
    // After getting the movie details we get the lit of celebrities,
    // then send them as an object with 2 properties { movieToEdit, celebrityList} to the form page

    const editMovie = Movie.findOne({ _id: id })
    console.log(editMovie)
    const celebrityList = Celebrity.find()
    console.log("All the celebs", celebrityList)



    res.render('./movies/edit-movies', editMovie, celebrityList)
})

router.post('/:id', (req, res) => { // call the post method on the movies/:id/edit route
    const { id } = req.params;
    const { title, genre, plot, cast } = req.body;

    User.findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => res.redirect(`/movies/${id}`))
        .catch(error => console.log(error))
})

module.exports = router;
