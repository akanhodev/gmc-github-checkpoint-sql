
-- 1. Create CUSTOMER Table
CREATE TABLE CUSTOMER (
    CustID VARCHAR2(5) PRIMARY KEY,
    CustName VARCHAR2(20) NOT NULL,
    Address VARCHAR2(50),
    City VARCHAR2(20)
);

-- 2. Create PRODUCT Table
CREATE TABLE PRODUCT (
    ProdID VARCHAR2(5) PRIMARY KEY,
    ProdName VARCHAR2(20) NOT NULL,
    Price NUMBER(6,2) CHECK (Price > 0)
);

-- 3. Create ORDERS Table
CREATE TABLE ORDERS (
    OrderID VARCHAR2(5) PRIMARY KEY,
    CustID VARCHAR2(5) NOT NULL,
    CONSTRAINT fk_orders_customer FOREIGN KEY (CustID) 
        REFERENCES CUSTOMER(CustID)
);

-- 4. Create ORDER_DETAIL Table (Junction table for Many-to-Many relationship)
CREATE TABLE ORDER_DETAIL (
    OrderID VARCHAR2(5),
    ProdID VARCHAR2(5),
    Quantity NUMBER(4) CHECK (Quantity > 0),
    CONSTRAINT pk_order_detail PRIMARY KEY (OrderID, ProdID),
    CONSTRAINT fk_orderdetail_orders FOREIGN KEY (OrderID) 
        REFERENCES ORDERS(OrderID),
    CONSTRAINT fk_orderdetail_product FOREIGN KEY (ProdID) 
        REFERENCES PRODUCT(ProdID)
);


-- Add Category column to PRODUCT table
ALTER TABLE PRODUCT 
ADD Category VARCHAR2(20);

-- Add OrderDate column to ORDERS table with SYSDATE as default
ALTER TABLE ORDERS 
ADD OrderDate DATE DEFAULT SYSDATE;
