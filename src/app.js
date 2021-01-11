import path from 'path';
import express from 'express';
import hbs from 'hbs';
import geocode from './utils/geocode.js';
import {
    forecast
} from './utils/forecast.js';

const app = express();
const port = process.env.PORT ||  3000 ;

//define paths for express config

const __dirname = path.resolve();
console.log('dirname:',__dirname);
const publicDir = path.join(__dirname, './public/');
console.log('public',publicDir);
const viewsPath = path.join(publicDir, '../templates/views');
console.log('views',viewsPath);

const partialsPath = path.join(publicDir, '../templates/partials')

//setup handlebars engine and views location

// app.set('view engine', 'hbs');
// app.set('views', '../templates/views');
// hbs.registerPartials('../templates/partials')

app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
//app.use(express.static('public/')) //basically defines the root
app.use(express.static(publicDir)) //because didn work with dynamic dirname
console.log(publicDir);


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Paulina Okulska'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Paulina Okulska'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'How could i help you?',
        title: 'Help',
        name: 'Paulina Okulska'
    });
})

// app.get('/help', (req, res) => {
//     res.send()
// }) // sends a json and parses it for us


//my render way

// app.get('/weather', (req, res) => {
//     if (!req.query.address) {
//         return res.render('404', {
//             title: 'Error',
//             errorText: 'You must provide a valid address.'
//         })
//     }
//     geocode(req.query.address, (error, {
//         longitude,
//         latitude,
//         location
//     } = {}) => {
//         if (error) {
//             return res.send({
//                 error: 'something went wrong'
//             })
//         }
//         forecast(longitude, latitude, (error, forecastData) => {
//             if (error) {
//                 return res.send({
//                     error,
//                 })
//             };
//             res.render('weather', {
//                 location,
//                 forecast:forecastData,
//                 address: req.query.address
//             });
//         })
//     });

// })

//tutorial way

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a valid address.'
        })
    }
    geocode(req.query.address, (error, {
        longitude,
        latitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error: 'Something went wrong. unable to find the location - try another search.'
            })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            });
        })
    });

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }

    console.log(req.query);
    console.log(req.query.search);

    res.send({
        products: [],
    })

})

app.get('/help/*', (req, res) => {
    res.render('404 Help', {
        title: 'Error',
        name: 'Paulina Okulska',
        errorText: 'Help article not found'
    })

})

//404 needs to come last
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Paulina Okulska',
        errorText: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log(`server is up on port 3000 ${port}`);
})

// app.listen(3000, () => {
//     console.log('server is up on port 3000');
// })