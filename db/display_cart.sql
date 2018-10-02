select * from cart
join products on cart.product_id = products.product_id
join users on cart.user_id = users.user_id
where users.user_id = ${user_id}