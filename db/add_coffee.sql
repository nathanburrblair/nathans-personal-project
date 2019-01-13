insert into coffees
(coffeename, coffeeroaster, coffeeorigin, coffeebrewmethod, coffeeweight, waterweight, rating, additionalthoughts, coffeeimage, user_id)
values 
( ${coffeename}, ${coffeeroaster}, ${coffeeorigin}, ${coffeebrewmethod}, ${coffeeweight}, ${waterweight}, ${rating}, ${additionalthoughts}, ${coffeeimage}, ${user_id});
select * from coffees;