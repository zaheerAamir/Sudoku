const PORT = process.env.PORT || 8000
const axios = require('axios').default
const express = require('express')
const cors = require('cors')
const corsOption = {
    origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
require('dotenv').config()
const app = express()
app.use(cors(corsOption))
app.use(express.json())



app.post('https://project-sathom.herokuapp.com/', (req,res) => {

    const options = {
        method: 'POST',
        url: 'https://solve-sudoku.p.rapidapi.com/',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '4c950a4ca5msh959e74b886a4c78p1c992bjsnd97091aca10c',
          'X-RapidAPI-Host': 'solve-sudoku.p.rapidapi.com'
        },
        data: '{"puzzle":"2.............62....1....7...6..8...3...9...7...6..4...4....8....52.............3"}'
      };
      
      axios.request(options).then(function (response) {
          console.log(response.data);
      }).catch(function (error) {
          console.error(error);
      });









   /*  const options = {
        method: 'POST',
        url: 'https://solve-sudoku.p.rapidapi.com/',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': 'solve-sudoku.p.rapidapi.com'
        },
        data: {puzzle: req.body.numbers}
    }

    axios.request(options).then(function (response) {
	    console.log(response.data);
        res.json(response.data)
    }).catch(function (error) {
	    console.error(error)
    }) */
})

app.listen(PORT, () => console.log('server listening on PORT ',{PORT}))