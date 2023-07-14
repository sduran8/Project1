// Function to send GET request to fetch all warehouses
async function getAllWarehouses() {
    try {
        const response = await fetch('http://localhost:8282/warehouses');
        if (!response.ok) {
            throw new Error('Error retrieving warehouses');
        }
        const warehouses = await response.json();
        return warehouses;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Function to send GET request to fetch a warehouse by ID
async function getWarehouseById(id) {
    try {
        const response = await fetch(`http://localhost:8282/warehouses/warehouse/${id}`);
        if (!response.ok) {
            throw new Error(`Error retrieving warehouse with ID ${id}`);
        }
        const warehouse = await response.json();
        return warehouse;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Function to send POST request to create a new warehouse
async function createWarehouse(warehouse) {
    try {
        const response = await fetch('http://localhost:8282/warehouses/warehouse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(warehouse),
        });
        if (!response.ok) {
            throw new Error('Error creating warehouse');
        }
        const newWarehouse = await response.json();
        return newWarehouse;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Function to send PUT request to update a warehouse
async function updateWarehouse(warehouse) {
    try {
        const response = await fetch('http://localhost:8282/warehouses/warehouse', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(warehouse),
        });
        if (!response.ok) {
            throw new Error(`Error updating warehouse with ID ${warehouse.warehouseId}`);
        }
        const updatedWarehouse = await response.json();
        return updatedWarehouse;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Function to send DELETE request to delete a warehouse
async function deleteWarehouse(warehouseId) {
    try {
        const response = await fetch('http://localhost:8282/warehouses/warehouse', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ warehouseId }),
        });
        if (!response.ok) {
            throw new Error(`Error deleting warehouse with ID ${warehouseId}`);
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

// Function to handle form submission for creating or updating a warehouse
async function handleFormSubmit(event) {
    event.preventDefault();

    // Get the form data
    const warehouseId = document.getElementById('new-warehouse-id').value;
    const warehouseName = document.getElementById('new-warehouse-name').value;
    const warehouseLocation = document.getElementById('new-warehouse-location').value;
    const warehouseAddress = document.getElementById('new-warehouse-address').value;
    const warehouseCapacity = document.getElementById('new-warehouse-capacity').value;

    // Create a warehouse object
    const warehouse = {
        warehouseId: Number(warehouseId),
        warehouseName,
        warehouseLocation,
        warehouseAddress,
        warehouseMaximumCapacity: Number(warehouseCapacity),
    };

    // Check if it's a new warehouse or an update
    if (!warehouseId) {
        // Create a new warehouse
        const newWarehouse = await createWarehouse(warehouse);
        if (newWarehouse) {
            // Clear the form fields
            clearFormFields();
            // Fetch all warehouses again and update the table
            fetchAllWarehousesAndUpdateTable();
        }
    } else {
        // Update an existing warehouse
        const updatedWarehouse = await updateWarehouse(warehouse);
        if (updatedWarehouse) {
            // Clear the form fields
            clearFormFields();
            // Fetch all warehouses again and update the table
            fetchAllWarehousesAndUpdateTable();
        }
    }
}

// Function to handle warehouse deletion
async function handleWarehouseDeletion(warehouseId) {
    const confirmed = confirm('Are you sure you want to delete this warehouse?');
    if (confirmed) {
        const success = await deleteWarehouse(warehouseId);
        if (success) {
            // Fetch all warehouses again and update the table
            fetchAllWarehousesAndUpdateTable();
        }
    }
}

// Function to populate the form fields with warehouse data for editing
function populateFormFields(warehouse) {
    document.getElementById('new-warehouse-id').value = warehouse.warehouseId;
    document.getElementById('new-warehouse-name').value = warehouse.warehouseName;
    document.getElementById('new-warehouse-location').value = warehouse.warehouseLocation;
    document.getElementById('new-warehouse-address').value = warehouse.warehouseAddress;
    document.getElementById('new-warehouse-capacity').value = warehouse.warehouseMaximumCapacity;
}

// Function to clear the form fields
function clearFormFields() {
    document.getElementById('new-warehouse-id').value = '';
    document.getElementById('new-warehouse-name').value = '';
    document.getElementById('new-warehouse-location').value = '';
    document.getElementById('new-warehouse-address').value = '';
    document.getElementById('new-warehouse-capacity').value = '';
}

// Function to fetch all warehouses, update the table, and set event listeners
async function fetchAllWarehousesAndUpdateTable() {
    const warehouses = await getAllWarehouses();
    if (warehouses) {
        const tableBody = document.getElementById('warehouse-table-body');
        tableBody.innerHTML = ''; // Clear the existing table rows

        warehouses.forEach((warehouse) => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = warehouse.warehouseId;
            row.appendChild(idCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = warehouse.warehouseName;
            row.appendChild(nameCell);

            const locationCell = document.createElement('td');
            locationCell.textContent = warehouse.warehouseLocation;
            row.appendChild(locationCell);

            const addressCell = document.createElement('td');
            addressCell.textContent = warehouse.warehouseAddress;
            row.appendChild(addressCell);

            const capacityCell = document.createElement('td');
            capacityCell.textContent = warehouse.warehouseMaximumCapacity;
            row.appendChild(capacityCell);

            const editCell = document.createElement('td');
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => {
                populateFormFields(warehouse);
            });
            editCell.appendChild(editButton);
            row.appendChild(editCell);

            const deleteCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                handleWarehouseDeletion(warehouse.warehouseId);
            });
            deleteCell.appendChild(deleteButton);
            row.appendChild(deleteCell);

            tableBody.appendChild(row);
        });
    }
}

// Event listener for form submission
const form = document.getElementById('new-warehouse-form');
form.addEventListener('submit', handleFormSubmit);

// Fetch all warehouses and update the table on page load
fetchAllWarehousesAndUpdateTable();