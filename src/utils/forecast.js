const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/f8cc482c77c911744c9e3421251f8d97/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si'

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Oops! No data found by forecast.', undefined)
        } else {
            callback(undefined, {
                timezone: body.timezone,
                summary: body.daily.data[0].summary,
                rainfall: body.currently.precipProbability,
                temperature: body.currently.temperature
            })
        }
    })
}

module.exports = forecast