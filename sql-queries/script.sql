-- These are the queries performed to generate the database tables on the backend

-- Warehouse Table
CREATE TABLE Warehouse (
  warehouse_id SERIAL PRIMARY KEY,
  warehouse_name VARCHAR(255) NOT NULL,
  warehouse_maximum_capacity INT NOT NULL,
  warehouse_location VARCHAR(255) NOT NULL,
  warehouse_address VARCHAR(255) NOT NULL
);

-- Product Table
CREATE TABLE Product (
  product_id SERIAL PRIMARY KEY,
  product_name VARCHAR(255) NOT NULL,
  product_category VARCHAR(255),
  product_description VARCHAR(255),
  product_price DECIMAL(10, 2) NOT NULL,
  product_dimensions VARCHAR(255) NOT NULL,
  product_weight DECIMAL(10, 2) NOT NULL
);

-- Inventory Table
CREATE TABLE Inventory (
  inventory_id SERIAL PRIMARY KEY,
  warehouse_id INT,
  product_id INT,
  quantity INT NOT NULL,
  FOREIGN KEY (warehouse_id) REFERENCES Warehouse(warehouse_id),
  FOREIGN KEY (product_id) REFERENCES Product(product_id)
);