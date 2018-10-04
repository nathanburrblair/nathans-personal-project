delete from coffees
where coffee_id = ${coffee_id};

select * from coffees
join users on coffees.user_id = users.user_id
where users.user_id = ${user_id}
order by coffee_id desc