-- Insert data into CUSTOMER table
INSERT INTO CUSTOMER (CustID, CustName, Address, City) 
VALUES ('C01', 'Ahmed Ali', '2 Talaat Harb Street', 'Cairo');

INSERT INTO CUSTOMER (CustID, CustName, Address, City) 
VALUES ('C02', 'Ibrahim Hassan', '18 ElGomhouria Street', 'Tanta');

INSERT INTO CUSTOMER (CustID, CustName, Address, City) 
VALUES ('C03', 'Khalid Kamel', '12 Giza Street', 'Giza');

INSERT INTO CUSTOMER (CustID, CustName, Address, City) 
VALUES ('C04', 'Mohamed Mourad', '45 Ahmad Orabi Street', 'AlMansoura');

-- Insert data into PRODUCT table
INSERT INTO PRODUCT (ProdID, ProdName, Price, Category) 
VALUES ('P01', 'Samsung', 1500.00, 'Electronics');

INSERT INTO PRODUCT (ProdID, ProdName, Price, Category) 
VALUES ('P02', 'Lenovo', 1800.00, 'Electronics');

INSERT INTO PRODUCT (ProdID, ProdName, Price, Category) 
VALUES ('P03', 'Asus', 1700.00, 'Electronics');

INSERT INTO PRODUCT (ProdID, ProdName, Price, Category) 
VALUES ('P04', 'HP', 2100.00, 'Electronics');

INSERT INTO PRODUCT (ProdID, ProdName, Price, Category) 
VALUES ('P05', 'Dell', 2200.00, 'Electronics');

INSERT INTO PRODUCT (ProdID, ProdName, Price, Category) 
VALUES ('P06', 'Acer', 2250.00, 'Electronics');

INSERT INTO ORDERS (OrderID, CustID, OrderDate) 
VALUES ('O01', 'C01', TO_DATE('12-JAN-2015', 'DD-MON-YYYY'));

INSERT INTO ORDERS (OrderID, CustID, OrderDate) 
VALUES ('O02', 'C02', TO_DATE('25-JAN-2015', 'DD-MON-YYYY'));

INSERT INTO ORDERS (OrderID, CustID, OrderDate) 
VALUES ('O03', 'C03', TO_DATE('15-FEB-2015', 'DD-MON-YYYY'));

INSERT INTO ORDERS (OrderID, CustID, OrderDate) 
VALUES ('O04', 'C01', TO_DATE('18-APR-2015', 'DD-MON-YYYY'));

-- Insert data into ORDER_DETAIL table
INSERT INTO ORDER_DETAIL (OrderID, ProdID, Quantity) 
VALUES ('O01', 'P01', 2);

INSERT INTO ORDER_DETAIL (OrderID, ProdID, Quantity) 
VALUES ('O01', 'P02', 3);

INSERT INTO ORDER_DETAIL (OrderID, ProdID, Quantity) 
VALUES ('O02', 'P03', 2);

INSERT INTO ORDER_DETAIL (OrderID, ProdID, Quantity) 
VALUES ('O03', 'P04', 5);

INSERT INTO ORDER_DETAIL (OrderID, ProdID, Quantity) 
VALUES ('O04', 'P01', 3);

INSERT INTO ORDER_DETAIL (OrderID, ProdID, Quantity) 
VALUES ('O04', 'P04', 4);

-- Commit the transaction to save all changes
COMMIT;