insert into coffees
(coffeename, coffeeroaster, coffeeorigin, coffeebrewmethod, coffeeweight, waterweight, rating, additionalthoughts, user_id)
values 
( ${coffeename}, ${coffeeroaster}, ${coffeeorigin}, ${coffeebrewmethod}, ${coffeeweight}, ${waterweight}, ${rating}, ${additionalthoughts}, ${user_id});
select * from coffees;