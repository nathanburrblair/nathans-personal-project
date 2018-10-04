
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const axios = require('axios');
const massive = require('massive');
const controller = require('./controller.js');
const bodyParser = require('body-parser');


const app = express();
app.use( express.static( `${__dirname}/../build` ) );

app.use(bodyParser.json());

const { 
    CONNECTION_STRING, 
    SESSION_SECRET, 
    SERVER_PORT, 
    REACT_APP_DOMAIN,
    REACT_APP_CLIENT_ID,
    CLIENT_SECRET,
    ENVIRONMENT,
    STRIPE_SECRET,
} = process.env;

massive(CONNECTION_STRING).then(db => app.set('db', db));

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))


app.use((req, res, next) => {
    if (ENVIRONMENT === 'dev') {
        req.app.get('db').set_data().then(userData => {
            req.session.user = userData[0]
            next();
        })
    } else {
        next();
    }
})

app.get('/auth/callback', async (req, res) => {
    let payload = {
        client_id: REACT_APP_CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `https://${req.headers.host}/auth/callback`
    }

    //post request with code for token
    
    let tokenRes = await axios.post(`https://${REACT_APP_DOMAIN}/oauth/token`, payload);
    
    //use token to get user data
    
    let userRes = await axios.get(`https://${REACT_APP_DOMAIN}/userinfo?access_token=${tokenRes.data.access_token}`)
    
    //see if we have a user in the database with that auth id already
    
    const db = req.app.get('db');
    const {email, name, picture, sub} = userRes.data; //destructuring
    let foundUser = await db.find_user([sub])
    if (foundUser[0]) {
        req.session.user = foundUser[0];
        console.log(req.session.user)
    } else {
        let createdUser = await db.create_user(
            [name, email, picture, sub])
            req.session.user = createdUser[0]
    }
    res.redirect('/#/get-started');
})

app.get('/api/user-data', (req, res) => {
    if (req.session.user) {
        res.status(200).send(req.session.user);
    } else {
        res.status(401).send('Go Log In')
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy();
        res.redirect(`https://nathanblair.auth0.com/v2/logout?returnTo=${process.env.REACT_APP_CLIENT_URL}&client_id=${REACT_APP_CLIENT_ID}`)
})

app.get('/api/coffees', controller.getCoffees)
app.post('/api/coffees', controller.addCoffee)
app.get('/api/coffees/get-latest', controller.showLastCoffee)
app.put('/api/coffees/:coffee_id', controller.updateCoffee)
app.get('/api/coffees/my-coffees', controller.showMyCoffees)
app.get('/api/coffees/all-coffees', controller.allCoffees)
app.get('/api/products', controller.allProducts)
app.delete('/api/coffees/my-coffees/:coffee_id', controller.deleteCoffee)
app.post('/api/cart', controller.addToCart)
app.get('/api/cart', controller.displayMyCart)
app.delete('/api/cart/:cart_id', controller.deleteFromCart)
app.post('/api/payment', controller.handlePayment)
app.delete('/api/cart', controller.clearCart)

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`)
})
