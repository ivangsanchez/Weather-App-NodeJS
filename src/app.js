const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

//Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ivan Sanchez'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'ABOUT',
        name: 'Ivan Sanchez'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HELP',
        helpText: 'Hi! How can i help you?',
        name: 'Ivan Sanchez'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
             error: 'You must provide a ADDRESS term'
         })
     }else {
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    
            if(error){
                return res.send({ error })
            }
          
            forecast(latitude, longitude, (error, forecastData) => {
        
                if(error) {
                    return res.send({ error })
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        }) 
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404Page', {
        title: '404',
        name: 'Ivan Sanchez',
        noticeText: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404Page',{
        title: '404',
        name: 'Ivan Sanchez',
        noticeText: 'My 404 Page'
    })
})


app.listen(port, () => {
    console.log('Server is Up on port!')
})