create table coffees (
    coffee_id serial primary key,
    user_id integer references users,
    coffeename varchar(180),
    coffeeroaster varchar(180), 
    coffeeorigin varchar(180),
    coffeebrewmethod varchar(180),
    coffeeweight integer,
    waterweight integer,
    rating integer,
    additionalthoughts text
)