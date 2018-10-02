update coffees
set additionalthoughts = ${additionalthoughts}, coffeename = ${coffeename}
where coffee_id = ${coffee_id};

select * from coffees
order by coffee_id desc
limit 1;