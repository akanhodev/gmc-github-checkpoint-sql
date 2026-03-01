-- Insert Customers
INSERT INTO CUSTOMER (CustomerID, CustomerName, Address, City) 
VALUES ('C01', 'Ahmed', '123 Main St', 'Tunis');
INSERT INTO CUSTOMER (CustomerID, CustomerName, Address, City) 
VALUES ('C02', 'Fatma', '456 Oak Ave', 'Sfax');
INSERT INTO CUSTOMER (CustomerID, CustomerName, Address, City) 
VALUES ('C03', 'Mohamed', '789 Pine Rd', 'Sousse');

-- Insert Products
INSERT INTO PRODUCT (ProductID, ProductName, Price, Category) 
VALUES ('P01', 'Laptop', 1200.00, 'Electronics');
INSERT INTO PRODUCT (ProductID, ProductName, Price, Category) 
VALUES ('P02', 'Mouse', 25.50, 'Electronics');
INSERT INTO PRODUCT (ProductID, ProductName, Price, Category) 
VALUES ('P03', 'Keyboard', 45.00, 'Electronics');
INSERT INTO PRODUCT (ProductID, ProductName, Price, Category) 
VALUES ('P04', 'Monitor', 300.00, 'Electronics');

-- Insert Orders
INSERT INTO ORDERS (OrderID, CustID, OrderDate) 
VALUES ('O01', 'C01', '2024-01-15');
INSERT INTO ORDERS (OrderID, CustID, OrderDate) 
VALUES ('O02', 'C02', '2024-01-16');
INSERT INTO ORDERS (OrderID, CustID, OrderDate) 
VALUES ('O03', 'C01', '2024-01-17');

-- Insert Order Details
INSERT INTO ORDER_DETAIL (OrderID, ProductID, Quantity) 
VALUES ('O01', 'P01', 2);
INSERT INTO ORDER_DETAIL (OrderID, ProductID, Quantity) 
VALUES ('O01', 'P02', 5);
INSERT INTO ORDER_DETAIL (OrderID, ProductID, Quantity) 
VALUES ('O02', 'P03', 3);
INSERT INTO ORDER_DETAIL (OrderID, ProductID, Quantity) 
VALUES ('O03', 'P04', 1);