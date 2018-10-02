create table products (
    product_id serial primary key,
    product_name varchar(180),
    product_origin varchar(180),
    product_roaster varchar(180),
    product_image text,
    price integer
)