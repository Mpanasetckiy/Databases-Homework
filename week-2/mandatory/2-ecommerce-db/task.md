# E-Commerce Database

In this homework, you are going to work with an ecommerce database. In this database, you have `products` that `consumers` can buy from different `suppliers`. Customers can create an `order` and several products can be added in one order.

## Submission

Below you will find a set of tasks for you to complete to set up a database for an e-commerce app.

To submit this homework write the correct commands for each question here:

```sql


```

When you have finished all of the questions - open a pull request with your answers to the `Databases-Homework` repository.

## Setup

To prepare your environment for this homework, open a terminal and create a new database called `cyf_ecommerce`:

```sql
createdb cyf_ecommerce
```

Import the file [`cyf_ecommerce.sql`](./cyf_ecommerce.sql) in your newly created database:

```sql
psql -d cyf_ecommerce -f cyf_ecommerce.sql
```

Open the file `cyf_ecommerce.sql` in VSCode and examine the SQL code. Take a piece of paper and draw the database with the different relationships between tables (as defined by the REFERENCES keyword in the CREATE TABLE commands). Identify the foreign keys and make sure you understand the full database schema.

## Task

Once you understand the database that you are going to work with, solve the following challenge by writing SQL queries using everything you learned about SQL:

1. Retrieve all the customers' names and addresses who live in the United States

cyf_ecommerce=# select \* from customers where country = 'United States';;
id | name | address | city | country
----+--------------+----------------------------+------------------+---------------
4 | Amber Tran | 6967 Ac Road | Villafranca Asti | United States
5 | Edan Higgins | Ap #840-3255 Tincidunt St. | Arles | United States
(2 rows)

2. Retrieve all the customers in ascending name sequence

cyf_ecommerce=# select \* from customers order by name;
id | name | address | city | country  
----+--------------------+-----------------------------+------------------+----------------
4 | Amber Tran | 6967 Ac Road | Villafranca Asti | United States
3 | Britanney Kirkland | P.O. Box 577, 5601 Sem, St. | Little Rock | United Kingdom
5 | Edan Higgins | Ap #840-3255 Tincidunt St. | Arles | United States
1 | Guy Crawford | 770-2839 Ligula Road | Paris | France
2 | Hope Crosby | P.O. Box 276, 4976 Sit Rd. | Steyr | United Kingdom
6 | Quintessa Austin | 597-2737 Nunc Rd. | Saint-Marc | United Kingdom
(6 rows)

3. Retrieve all the products whose name contains the word `socks`

cyf_ecommerce=# select \* from products where product_name like '%socks%';
id | product_name
----+------------------
4 | Super warm socks
(1 row)

4. Retrieve all the products which cost more than 100 showing product id, name, unit price and supplier id.

cyf_ecommerce=# SELECT product_availability.prod_id, product_availability.supp_id, product_availability.unit_price, products.product_name FROM product_availability
cyf_ecommerce-# JOIN products ON product_availability.prod_id=products.id
cyf_ecommerce-# WHERE product_availability.unit_price > 100;
prod_id | supp_id | unit_price | product_name
---------+---------+------------+----------------
1 | 4 | 249 | Mobile Phone X
1 | 1 | 299 | Mobile Phone X
(2 rows)

5. Retrieve the 5 most expensive products

cyf_ecommerce=# select product_availability.prod_id, product_availability.supp_id, product_availability.unit_price, products.product_name from product_availability JOIN products ON product_availability.prod_id=products.id order by unit_price desc
cyf_ecommerce-# limit 5;
prod_id | supp_id | unit_price | product_name
---------+---------+------------+-----------------
1 | 1 | 299 | Mobile Phone X
1 | 4 | 249 | Mobile Phone X
2 | 2 | 41 | Javascript Book
2 | 1 | 40 | Javascript Book
2 | 3 | 39 | Javascript Book
(5 rows)

6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`

cyf_ecommerce=# SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM products JOIN product_availability ON product_availability.prod_id=products.id JOIN suppliers ON suppliers.id=product_availability.supp_id;
product_name | unit_price | supplier_name
-------------------------+------------+---------------
Mobile Phone X | 249 | Sainsburys
Mobile Phone X | 299 | Amazon
Javascript Book | 41 | Taobao
Javascript Book | 39 | Argos
Javascript Book | 40 | Amazon
Le Petit Prince | 10 | Sainsburys
Le Petit Prince | 10 | Amazon
Super warm socks | 10 | Sainsburys
Super warm socks | 8 | Argos
Super warm socks | 5 | Taobao
Super warm socks | 10 | Amazon
Coffee Cup | 5 | Sainsburys
Coffee Cup | 4 | Argos
Coffee Cup | 4 | Taobao
Coffee Cup | 3 | Amazon
Ball | 20 | Taobao
Ball | 15 | Sainsburys
Ball | 14 | Amazon
Tee Shirt Olympic Games | 21 | Argos
Tee Shirt Olympic Games | 18 | Taobao
Tee Shirt Olympic Games | 20 | Amazon
(21 rows)

7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`.

cyf_ecommerce=# SELECT products.product_name, suppliers.supplier_name FROM products JOIN product_availability ON product_availability.prod_id=products.id JOIN suppliers ON suppliers.id=product_availability.supp_id WHERE suppliers.country = 'United Kingdom';
product_name | supplier_name
-------------------------+---------------
Javascript Book | Argos
Super warm socks | Argos
Coffee Cup | Argos
Tee Shirt Olympic Games | Argos
Mobile Phone X | Sainsburys
Le Petit Prince | Sainsburys
Super warm socks | Sainsburys
Coffee Cup | Sainsburys
Ball | Sainsburys
(9 rows)

8. Retrieve all orders, including order items, from customer ID `1`. Include order id, reference, date and total cost (calculated as quantity \* unit price).

cyf_ecommerce=# SELECT
cyf_ecommerce-# orders.id,
cyf_ecommerce-# orders.order_reference,
cyf_ecommerce-# orders.order_date,
cyf_ecommerce-# SUM(order_items.quantity \* product_availability.unit_price) as total_cost
cyf_ecommerce-# FROM orders
cyf_ecommerce-# JOIN order_items ON orders.id = order_items.order_id
cyf_ecommerce-# JOIN product_availability ON order_items.product_id = product_availability.prod_id
cyf_ecommerce-# AND order_items.supplier_id = product_availability.supp_id
cyf_ecommerce-# WHERE orders.customer_id = 1
cyf_ecommerce-# GROUP BY orders.id, orders.order_reference, orders.order_date;
id | order_reference | order_date | total_cost
----+-----------------+------------+------------
1 | ORD001 | 2019-06-01 | 43
2 | ORD002 | 2019-07-15 | 42
3 | ORD003 | 2019-07-11 | 80
(3 rows)

9. Retrieve all orders, including order items, from customer named `Hope Crosby`

cyf_ecommerce=# SELECT
cyf_ecommerce-# customers.id,
cyf_ecommerce-# customers.name,
cyf_ecommerce-# orders.order_reference,
cyf_ecommerce-# order_items.quantity
cyf_ecommerce-# FROM customers
cyf_ecommerce-# JOIN orders ON customers.id = orders.customer_id
cyf_ecommerce-# JOIN order_items ON orders.id = order_items.order_id
cyf_ecommerce-# WHERE customers.name = 'Hope Crosby';
id | name | order_reference | quantity
----+-------------+-----------------+----------
2 | Hope Crosby | ORD004 | 1
(1 row)

10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.

cyf_ecommerce=# SELECT order_items.order_id, order_items.quantity, products.product_name, product_availability.unit_price FROM order_items JOIN products ON order_items.product_id=products.id JOIN product_availability ON order_items.product_id=product_availability.prod_id AND order_items.supplier_id=product_availability.supp_id WHERE order_items.order_id = 6;
order_id | quantity | product_name | unit_price
----------+----------+------------------+------------
6 | 1 | Javascript Book | 41
6 | 1 | Le Petit Prince | 10
6 | 3 | Super warm socks | 10
6 | 3 | Coffee Cup | 4
(4 rows)

11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference`, `order_date`, `product_name`, `supplier_name` and `quantity`.

cyf_ecommerce=# SELECT suppliers.supplier_name, order_items.order_id, order_items.quantity, orders.order_date, customers.name, products.product_name FROM suppliers JOIN order_items ON order_items.supplier_id=suppliers.id JOIN orders ON order_items.order_id=orders.id JOIN customers ON orders.customer_id=customers.id JOIN products ON order_items.product_id = products.id;
supplier_name | order_id | quantity | order_date | name | product_name
---------------+----------+----------+------------+--------------------+-------------------------
Taobao | 1 | 1 | 2019-06-01 | Guy Crawford | Tee Shirt Olympic Games
Taobao | 1 | 5 | 2019-06-01 | Guy Crawford | Super warm socks
Argos | 2 | 4 | 2019-07-15 | Guy Crawford | Super warm socks
Sainsburys | 2 | 1 | 2019-07-15 | Guy Crawford | Le Petit Prince
Argos | 3 | 10 | 2019-07-11 | Guy Crawford | Coffee Cup
Taobao | 3 | 2 | 2019-07-11 | Guy Crawford | Ball
Amazon | 4 | 1 | 2019-05-24 | Hope Crosby | Mobile Phone X
Argos | 5 | 2 | 2019-05-30 | Britanney Kirkland | Javascript Book
Amazon | 5 | 1 | 2019-05-30 | Britanney Kirkland | Le Petit Prince
Taobao | 6 | 3 | 2019-07-05 | Amber Tran | Coffee Cup
Taobao | 6 | 1 | 2019-07-05 | Amber Tran | Javascript Book
Sainsburys | 6 | 1 | 2019-07-05 | Amber Tran | Le Petit Prince
Sainsburys | 6 | 3 | 2019-07-05 | Amber Tran | Super warm socks
Argos | 7 | 15 | 2019-04-05 | Amber Tran | Super warm socks
Amazon | 8 | 1 | 2019-07-23 | Edan Higgins | Tee Shirt Olympic Games
Sainsburys | 8 | 1 | 2019-07-23 | Edan Higgins | Mobile Phone X
Sainsburys | 9 | 2 | 2019-07-24 | Edan Higgins | Ball
Taobao | 10 | 1 | 2019-05-10 | Edan Higgins | Ball
Amazon | 10 | 5 | 2019-05-10 | Edan Higgins | Super warm socks
(19 rows)

12. Retrieve the names of all customers who bought a product from a supplier based in China.

    cyf_ecommerce=# SELECT suppliers.supplier_name, order_items.order_id, orders.order_reference, customers.name FROM suppliers JOIN order_items ON order_items.supplier_id=suppliers.id JOIN orders ON order_items.order_id=orders.id JOIN customers ON orders.customer_id=customers.id
    cyf_ecommerce-# WHERE suppliers.country = 'China';
    supplier_name | order_id | order_reference | name
    ---------------+----------+-----------------+--------------
    Taobao | 1 | ORD001 | Guy Crawford
    Taobao | 1 | ORD001 | Guy Crawford
    Taobao | 3 | ORD003 | Guy Crawford
    Taobao | 6 | ORD006 | Amber Tran
    Taobao | 6 | ORD006 | Amber Tran
    Taobao | 10 | ORD010 | Edan Higgins
    (6 rows)

13. List all orders giving customer name, order reference, order date and order total amount (quantity \* unit price) in descending order of total.

cyf_ecommerce=# SELECT customers.name, orders.order_reference, orders.order_date, order_items.quantity, order_items.product_id, product_availability.unit_price, (order_items.quantity \* product_availability.unit_price) as total_cost FROM customers JOIN orders ON customers.id=orders.customer_id JOIN order_items ON order_items.order_id=orders.id JOIN product_availability ON order_items.supplier_id=product_availability.supp_id AND order_items.product_id=product_availability.prod_id ORDER BY total_cost DESC;
name | order_reference | order_date | quantity | product_id | unit_price | total_cost
--------------------+-----------------+------------+----------+------------+------------+------------
Hope Crosby | ORD004 | 2019-05-24 | 1 | 1 | 299 | 299
Edan Higgins | ORD008 | 2019-07-23 | 1 | 1 | 249 | 249
Amber Tran | ORD007 | 2019-04-05 | 15 | 4 | 8 | 120
Britanney Kirkland | ORD005 | 2019-05-30 | 2 | 2 | 39 | 78
Edan Higgins | ORD010 | 2019-05-10 | 5 | 4 | 10 | 50
Amber Tran | ORD006 | 2019-07-05 | 1 | 2 | 41 | 41
Guy Crawford | ORD003 | 2019-07-11 | 10 | 5 | 4 | 40
Guy Crawford | ORD003 | 2019-07-11 | 2 | 6 | 20 | 40
Guy Crawford | ORD002 | 2019-07-15 | 4 | 4 | 8 | 32
Edan Higgins | ORD009 | 2019-07-24 | 2 | 6 | 15 | 30
Amber Tran | ORD006 | 2019-07-05 | 3 | 4 | 10 | 30
Guy Crawford | ORD001 | 2019-06-01 | 5 | 4 | 5 | 25
Edan Higgins | ORD008 | 2019-07-23 | 1 | 7 | 20 | 20
Edan Higgins | ORD010 | 2019-05-10 | 1 | 6 | 20 | 20
Guy Crawford | ORD001 | 2019-06-01 | 1 | 7 | 18 | 18
Amber Tran | ORD006 | 2019-07-05 | 3 | 5 | 4 | 12
Amber Tran | ORD006 | 2019-07-05 | 1 | 3 | 10 | 10
Britanney Kirkland | ORD005 | 2019-05-30 | 1 | 3 | 10 | 10
Guy Crawford | ORD002 | 2019-07-15 | 1 | 3 | 10 | 10
(19 rows)
