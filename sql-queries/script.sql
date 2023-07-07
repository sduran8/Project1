-- These are the queries performed to generate the database tables on the backend

-- Warehouse Table
CREATE TABLE Warehouse (
  warehouse_id SERIAL PRIMARY KEY,
  warehouse_name VARCHAR(255) NOT NULL,
  warehouse_maximum_capacity INT NOT NULL,
  warehouse_location VARCHAR(255) NOT NULL,
  warehouse_address VARCHAR(255) NOT NULL
);

-- Entity Table
CREATE TABLE Entity (
  entity_id SERIAL PRIMARY KEY,
  entity_name VARCHAR(255) NOT NULL,
  entity_category VARCHAR(255),
  entity_description VARCHAR(255),
  entity_price DECIMAL(10, 2) NOT NULL,
  entity_dimensions VARCHAR(255) NOT NULL,
  entity_weight DECIMAL(10, 2) NOT NULL
);

-- Inventory Table
CREATE TABLE Inventory (
  inventory_id SERIAL PRIMARY KEY,
  warehouse_id INT,
  entity_id INT,
  quantity INT NOT NULL,
  FOREIGN KEY (warehouse_id) REFERENCES Warehouse(warehouse_id),
  FOREIGN KEY (entity_id) REFERENCES Entity(entity_id)
);