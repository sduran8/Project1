-- Here is how some of the data was inserted into each database

-- Insert sample warehouse records
INSERT INTO Warehouse (warehouse_name, warehouse_maximum_capacity, warehouse_location, warehouse_address)
VALUES
  ('Toy City Warehouse', 5000, 'Toy City', '123 Main Street'),
  ('Playland Warehouse', 8000, 'Playland', '456 Park Avenue');

-- Insert sample toy records
INSERT INTO Product (product_name, product_category, product_description, product_price, product_dimensions, product_weight)
VALUES
  ('Action Figure', 'Action Figures', 'Poseable action figure with accessories', 19.99, '10 x 5 x 3 inches', 0.5),
  ('Doll', 'Dolls', 'Soft-bodied doll with realistic features', 24.99, '12 x 6 x 4 inches', 0.8);

-- Insert sample inventory records
INSERT INTO Inventory (warehouse_id, product_id, quantity)
VALUES
  (1, 1, 100),  -- Warehouse 1 has 100 Action Figures
  (1, 2, 50);   -- Warehouse 1 has 50 Dolls