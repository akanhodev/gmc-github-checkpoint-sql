

-- 1. Display all the data of customers
SELECT * FROM customers;

-- 2. Display the product_name and category for products which their price is between 5000 and 10000
SELECT product_name, category 
FROM products 
WHERE price BETWEEN 5000 AND 10000;

-- 3. Display all the data of products sorted in descending order of price
SELECT * FROM products 
ORDER BY price DESC;

-- 4. Display the total number of orders, the average amount, the highest total amount and the lower total amount
SELECT 
    COUNT(*) AS total_orders,
    AVG(total_amount) AS average_amount,
    MAX(total_amount) AS highest_amount,
    MIN(total_amount) AS lowest_amount
FROM orders;

-- 5. For each product_id, display the number of orders
SELECT 
    product_id, 
    COUNT(*) AS number_of_orders
FROM orders
GROUP BY product_id;

-- 6. Display the customer_id which has more than 2 orders
SELECT customer_id
FROM orders
GROUP BY customer_id
HAVING COUNT(*) > 2;

-- 7. For each month of the 2020 year, display the number of orders
SELECT 
    MONTH(order_date) AS month,
    COUNT(*) AS number_of_orders
FROM orders
WHERE YEAR(order_date) = 2020
GROUP BY MONTH(order_date)
ORDER BY month;

-- 8. For each order, display the product_name, the customer_name and the date of the order
SELECT 
    p.product_name,
    c.customer_name,
    o.order_date
FROM orders o
JOIN products p ON o.product_id = p.product_id
JOIN customers c ON o.customer_id = c.customer_id;

-- 9. Display all the orders made three months ago
SELECT * FROM orders
WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)
  AND order_date < DATE_SUB(CURDATE(), INTERVAL 2 MONTH);

-- 10. Display customers (customer_id) who have never ordered a product
SELECT customer_id
FROM customers
WHERE customer_id NOT IN (SELECT DISTINCT customer_id FROM orders);