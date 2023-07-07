
# Toy Company Inventory Management

This project is an inventory management solution designed for a toy company. It enables administrators to manage the entities (toys) at various warehouses, providing features such as viewing, adding, removing, and altering toy records. The application offers an intuitive user interface to facilitate efficient inventory management.

## Table of Contents
- [Features](#features)
- [Database Structure](#database-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- View entities (toys) available in each warehouse.
- Add new entities to a specific warehouse.
- Remove entities from a warehouse.
- Update the quantity of existing entities in a warehouse.
- Handle maximum capacity constraints of warehouses.
- Intuitive user interface for easy navigation and interaction.
- Clear and concise UI/UX design.

## Database Structure

The database structure for this project consists of the following tables:

- Warehouse: Stores information about the company's warehouses, including their names, maximum capacities, locations, and addresses.

- Entity: Represents the entities (toys) available in the inventory. It includes attributes such as entity name, category, description, price, dimensions, and weight.

- Inventory: Connects the warehouses and entities, tracking the quantity of each entity in a specific warehouse.

## Installation

To run this inventory management solution locally, follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/your-username/inventory-management.git
   ```

2. Install the necessary dependencies:

   ```shell
   cd inventory-management
   npm install
   ```

3. Set up the database by executing the SQL scripts provided in the `database` folder.

4. Configure the database connection settings in the application.

5. Start the application:

   ```shell
   npm start
   ```

6. Access the application in your web browser at `http://localhost:3000`.

## Usage

1. Log in to the application using your administrator credentials.

2. Navigate to the Warehouse section to view a list of warehouses and their respective information.

3. To manage the entities (toys) within a warehouse:
   - View the existing entities and their quantities.
   - Add new entities to the warehouse, specifying the necessary details.
   - Remove entities from the warehouse.
   - Update the quantity of existing entities.

4. Ensure that the maximum capacity of each warehouse is not exceeded when adding or updating entities.

5. Utilize the user-friendly interface to efficiently manage the company's toy inventory across different warehouses.

## Contributing

Contributions to this inventory management project are welcome! If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request. Your feedback and contributions are highly appreciated.

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to customize and modify this README file to best suit your project's specific requirements and details.
