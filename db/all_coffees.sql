select coffeename, coffeeroaster, coffeeorigin, coffeebrewmethod, rating, additionalthoughts, user_name, picture from coffees
join users on coffees.user_id = users.user_id
order by coffee_id desc