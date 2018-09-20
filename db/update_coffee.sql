update coffees
set additionalthoughts = ${additionalthoughts}
where coffee_id = ${coffee_id};

select * from coffees