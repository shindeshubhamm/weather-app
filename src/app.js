const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Paths for express config
const publicDirectoryPath = path.join(__dirname, "../public/")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Shubham Shinde'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shubham Shinde'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Shubham Shinde',
        message: "This is a sample help message. Please help!"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide a location."
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, { timezone, summary, temperature, rainfall } = {}) => {
            if (error) {
                return res.send({ error })
            }
            res.send({ location, timezone, summary, temperature, rainfall })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        title: 'Error 404',
        name: 'Shubham Shinde'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page Not Found',
        title: 404,
        name: 'Shubham Shinde'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})