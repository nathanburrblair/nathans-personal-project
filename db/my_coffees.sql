select 
coffee_id,
coffeename, 
coffeeroaster, 
coffeeorigin, 
coffeebrewmethod, 
coffeeweight,
waterweight,
rating, 
additionalthoughts, 
email 
from coffees
join users on coffees.user_id = users.user_id
order by coffee_id desc