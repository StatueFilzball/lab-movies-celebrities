// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const bodyParser = require('body-parser')

const Celebrity = require('../models/Celebrity.model.js')

router.use(bodyParser.urlencoded({ extended: true}));



router.get('/create', (req,res) => {
    res.render('./celebrities/new-celebrity')
  })


router.post('/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body

    Celebrity.create({ name, occupation, catchPhrase })
    .then(() => res.redirect('/'))
    .catch(error => res.redirect('/celebrities/create'))
})


router.get('/', (req,res) => {
Celebrity.find()
.then( allCelebrities =>{
    res.render('./celebrities/celebrities', { allCelebrities })

})
.catch(error => console.log(error))

  })

  module.exports = router;