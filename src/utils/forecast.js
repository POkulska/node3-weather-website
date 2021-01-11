import request from 'postman-request';


const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=382d14da2cc8605b1e21e3d45ceb637f&query=${long},${lat}&units=m`;
    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback(`Unable to connect to the weather service.`, undefined)
        } 
        else if (body.error) {
            callback(`Unable to find the location. Error message: ${body.error.info}`)
        } 
        else {
            callback(undefined,`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. There perceivable temperature though is ${body.current.feelslike} degrees` )            
        }
    })
}

// const printAndLog = (error, data) => {
//     console.log('error:', error);
//     console.log('data:', data);
//     console.log(`${data.description}. It is currently ${data.temperature} degrees out. There perceivable temperature though is ${data.perceivableTemperature} degrees`);
// }

// forecast(-75.7088, 44.1545, (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
//   })
// forecast(-75.7088, 44.1545, printAndLog)



export {
    forecast
};