require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET);

module.exports = {
    getCoffees: (req, res) => {
        const db = req.app.get('db');
        db.get_coffees()
        .then(coffees => {
            res.status(200).send(coffees);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    },

    addCoffee: (req, res, next) => {
        let {coffeename, coffeeroaster, coffeeorigin, coffeebrewmethod, coffeeweight, waterweight, rating, additionalthoughts} = req.body.coffee;
        let {user_id} = req.session.user
        console.log(req.session)
        const db = req.app.get('db');
        db.add_coffee({coffeename, coffeeroaster, coffeeorigin, coffeebrewmethod, coffeeweight, waterweight, rating, additionalthoughts, user_id})
        .then(coffees => {
            res.status(200).send(coffees)
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        })
    }, 

    showLastCoffee: (req, res) => {
        const db = req.app.get('db');
        db.last_coffee()
        .then(coffees => {
            res.status(200).send(coffees);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    }, 

    updateCoffee: (req, res) => {
        let {additionalthoughts} = req.body;
        let {coffee_id} = req.params;
        const db = req.app.get('db')
        db.update_coffee({additionalthoughts, coffee_id})
        .then(coffees => {
            res.status(200).send(coffees)
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    }, 

    showMyCoffees: (req, res) => {
        let {user_id} = req.session.user;
        const db = req.app.get('db');
        db.my_coffees({user_id})
        .then( coffees => {
            res.status(200).send(coffees);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    }, 

    allCoffees: (req, res) => {
        const db = req.app.get('db');
        db.all_coffees()
        .then( coffees => {
            res.status(200).send(coffees);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    }, 

    allProducts: (req, res) => {
        const db = req.app.get('db');
        db.all_products()
        .then(products => {
            res.status(200).send(products);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    }, 

    deleteCoffee: (req, res) => {
        let {coffee_id} = req.params;
        let {user_id} = req.session.user;
        const db = req.app.get('db');
        db.delete_coffee({coffee_id, user_id})
        .then(coffees => {
            res.status(200).send(coffees);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    }, 
    
    addToCart: (req, res) => {
        let {product_id} = req.body;
        let {user_id} = req.session.user;
        const db = req.app.get('db');
        db.add_to_cart({product_id, user_id})
        .then(cart => {
            res.status(200).send(cart)
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        })
    }, 

    displayMyCart: (req, res) => {
        let {user_id} = req.session.user;
        const db = req.app.get('db');
        db.display_cart({user_id})
        .then(cart => {
            res.status(200).send(cart)
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        })
    }, 

    deleteFromCart: (req, res) => {
        let {cart_id} = req.params;
        let {user_id} = req.session.user;
        const db = req.app.get('db');
        db.delete_from_cart({cart_id, user_id})
        .then(cart => {
            res.status(200).send(cart);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    }, 

    handlePayment: (req, res) => {
        const {amount, token:{id}} = req.body
        stripe.charges.create(
            {
                amount: amount,
                currency: "usd",
                source: id,
                description: "Test charge from Nathan"
            },
            (err, charge) => {
                if(err) {
                    console.log(err)
                    return res.status(500).send(err)
                } else {
                    console.log(charge)
                    return res.status(200).send(charge)
                }
            }
        )
    },

    clearCart: (req,res) => {
        let {cart_id} = req.params;
        let {user_id} = req.session.user;
        const db = req.app.get('db');
        db.clear_cart({cart_id, user_id})
        .then(cart => {
            res.status(200).send(cart);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    }
}