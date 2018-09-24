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
    }
}