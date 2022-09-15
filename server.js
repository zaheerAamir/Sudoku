const PORT = process.env.PORT || 8000
const axios = require('axios').default
const express = require('express')
const cors = require('cors')

require('dotenv').config()
const app = express()
app.use(cors({
    origin: 'https://project-sathom.herokuapp.com/:heartfelt-blancmange-4ce36d.netlify.app/',
    methods: ['GET','POST'],
}))
app.use(express.json())

/* app.get('/',(req,res) => {
    res.send('App is running')
}) */
app.post('/', (req,res) => {

    const options = {
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
    })

    res.send('request completed')
})

app.listen(PORT, () => console.log('server listening on PORT ',{PORT}))