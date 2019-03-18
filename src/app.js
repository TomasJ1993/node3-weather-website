const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require ('./utils/forecast')

const app = express ()
const port = process.env.PORT || 3000
//define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
  res.render('index',{
    title: "Weather",
    name: 'Tomas'
  })
})
app.get('/weather', (req,res)=>{
  if(!req.query.address){
    return res.send({
      error:'You must provide an address!'
    })
  }

//geocode and forecast part
  geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
    console.log(latitude);
    if (error){
      return console.log(error);
    }

    forecast(latitude,longitude, (error, forecastData) => {
      if (error){
        return console.log(error);
      }
      res.send({
        address: location,
        forecast: forecastData
      })
    })
  })




  })

  app.get('/products', (req, res)=>{
    if(!req.query.search){
      return res.send({
        error: 'You must provide a search term'
      })
    }

    console.log(req.query.search);
    res.send({
      products: [],
    })
  })

  app.get('/help', (req,res)=>{
    res.render('help', {
      help: 'This is a help message',
      title: 'Help page title',
      name: 'Tomas'
    })
  })

  app.get('/about', (req,res)=>{
    res.render('about', {
      about: "About page",
      title: "About page title",
      name: 'Tomas'
    })
  })

  app.get('/me', (req,res)=>{
    res.render('me',{
      title: 'My information',
      name: 'Tomas'
    })
  })

  app.get('/help/*', (req,res)=>{
    res.render('404', {
      title: "404",
      name: 'Tomas',
      errorMessage: "Content not found"
    })
  })
  // app.com
  // app.com/help
  // app.co m/
  app.get('*', (req,res)=>{
    res.render('404', {
      title: "404",
      name: 'Tomas',
      errorMessage: "Page Not Found"
    })

  })

  app.get('*', (req,res)=>{
    res.send('My 404 page')
  })



  app.listen(port, ()=>{
    console.log('Server is up on port ' + port);
  })
