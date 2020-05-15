const request= require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1855802cf28a6387a5b627802845f945&query='+ encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude) + '&units=m'
    request({ url, json:true }, (error, {body}) => {

        if(error) {
            callback('Unable to connect to weather service!',undefined)
        } else if(body.error){
            callback('Unable to find location',undefined)
        }else {
            const temperature = body.current.temperature
            const feelslike = body.current.feelslike
            const description = body.current.weather_descriptions[0]
            const textResponse = `${description} It is currently ${temperature} degrees out. It feels like ${feelslike} degress out`
            callback(undefined,textResponse)
        }
    
    }) 
}

module.exports = forecast