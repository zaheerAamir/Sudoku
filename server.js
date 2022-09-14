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
        method: 'GET',
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
    })
})

app.listen(PORT, () => console.log('server listening on PORT ',{PORT}))