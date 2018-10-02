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
        let {additionalthoughts, coffeename} = req.body;
        let {coffee_id} = req.params;
        const db = req.app.get('db')
        db.update_coffee({additionalthoughts, coffeename, coffee_id})
        .then(coffees => {
            res.status(200).send(coffees)
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    }, 

    showMyCoffees: (req, res) => {
        const db = req.app.get('db');
        db.my_coffees()
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
        const db = req.app.get('db');
        let {coffee_id} = req.params;

        db.delete_coffee({coffee_id})
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
    }
}