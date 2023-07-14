// Function to fetch all inventories from the server
async function getAllInventories() {
    try {
        const response = await fetch('http://localhost:8282/inventory');
        if (!response.ok) {
            throw new Error('Unable to fetch inventories.');
        }
        const inventories = await response.json();
        return inventories;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Function to fetch a warehouse by name from the server
async function getWarehouseByName(warehouseName) {
    try {
        const response = await fetch(`http://localhost:8282/warehouses/name/${warehouseName}`);
        if (!response.ok) {
            throw new Error(`Unable to fetch warehouse with name: ${warehouseName}`);
        }
        const warehouse = await response.json();
        return warehouse;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Function to fetch a product by name from the server
async function getProductByName(productName) {
    try {
        const response = await fetch(`http://localhost:8282/products/name/${productName}`);
        if (!response.ok) {
            throw new Error(`Unable to fetch product with name: ${productName}`);
        }
        const product = await response.json();
        return product;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Function to fetch an inventory by ID from the server
async function getInventoryById(inventoryId) {
    try {
        const response = await fetch(`http://localhost:8282/inventory/shipment/${inventoryId}`);
        if (!response.ok) {
            throw new Error(`Unable to fetch inventory with ID: ${inventoryId}`);
        }
        const inventory = await response.json();
        return inventory;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Function to create a new inventory
async function createInventory(inventory) {
    try {
        const response = await fetch('http://localhost:8282/inventory/addinventory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inventory),
        });
        if (!response.ok) {
            throw new Error('Unable to create the inventory.');
        }
        const newInventory = await response.json();
        return newInventory;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Function to update an inventory
async function updateInventory(inventory) {
    try {
        const response = await fetch('http://localhost:8282/inventory/addinventory', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inventory),
        });
        if (!response.ok) {
            throw new Error(`Unable to update the inventory with ID ${inventory.inventoryId}`);
        }
        const updatedInventory = await response.json();
        return updatedInventory;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Function to delete an inventory
async function deleteInventory(inventory) {
    try {
        const response = await fetch('http://localhost:8282/inventory/inventory', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inventory),
        });
        if (!response.ok) {
            throw new Error(`Unable to delete the inventory with ID ${inventory.inventoryId}`);
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

// Function to display the inventory data in the table
function displayInventoryData(inventory) {
    const inventoryTableBody = document.getElementById('inventory-table-body');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${inventory.inventoryId}</td>
        <td>${inventory.warehouse.warehouseName}</td>
        <td>${inventory.product.productName}</td>
        <td>${inventory.quantity}</td>
        <td>
        <button class="edit-button" onclick="editInventory(${inventory.inventoryId})">Edit</button>
        </td>
        <td>
        <button class="delete-button" onclick="deleteInventoryConfirmation(${inventory.inventoryId})">Delete</button>
        </td>
    `;
    inventoryTableBody.appendChild(row);
}

// Function to populate the table with inventory data
async function populateInventoryTable() {
    const inventories = await getAllInventories();
    const inventoryTableBody = document.getElementById('inventory-table-body');
    inventoryTableBody.innerHTML = '';

    if (inventories.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = '<td colspan="6">No inventories found.</td>';
        inventoryTableBody.appendChild(emptyRow);
    } else {
        inventories.forEach((inventory) => {
            displayInventoryData(inventory);
        });
    }
}

// Function to clear the input fields in the new inventory form
function clearNewInventoryForm() {
    document.getElementById('new-inventory-id').value = '';
    document.getElementById('new-warehouse-name').value = '';
    document.getElementById('new-product-name').value = '';
    document.getElementById('new-inventory-quantity').value = '';
}

// Function to handle the form submission for creating a new inventory
async function handleNewInventoryFormSubmit(event) {
    event.preventDefault();

    const warehouseName = document.getElementById('new-warehouse-name').value;
    const productName = document.getElementById('new-product-name').value;
    const quantity = parseInt(document.getElementById('new-inventory-quantity').value);

    const warehouse = await getWarehouseByName(warehouseName);
    const product = await getProductByName(productName);

    if (warehouse && product) {
        const inventory = {
            warehouseId: warehouse.warehouseId,
            productId: product.productId,
            quantity: quantity,
        };

        const createdInventory = await createInventory(inventory);
        if (createdInventory) {
            displayInventoryData(createdInventory);
            clearNewInventoryForm();
        }
    }
}

// Function to populate the update inventory form with the inventory data
async function populateUpdateInventoryForm(inventoryId) {
    const inventory = await getInventoryById(inventoryId);
    if (inventory) {
        document.getElementById('update-inventory-id').value = inventory.inventoryId;
        document.getElementById('update-warehouse-name').textContent = inventory.warehouse.warehouseName;
        document.getElementById('update-product-name').textContent = inventory.product.productName;
        document.getElementById('update-inventory-quantity').value = inventory.quantity;
    }
}

// Function to handle the form submission for updating an inventory
async function handleUpdateInventoryFormSubmit(event) {
    event.preventDefault();
    const inventory = {
        inventoryId: parseInt(document.getElementById('update-inventory-id').value),
        warehouseId: getWarehouseByName(document.getElementById('update-warehouse-name').value),
        productId: getProductByName(document.getElementById('update-product-name').value),
        quantity: parseInt(document.getElementById('update-inventory-quantity').value),
    };
    const updatedInventory = await updateInventory(inventory);
    if (updatedInventory) {
        // Update the table row
        const inventoryRow = document.querySelector(`#inventory-table-body tr:nth-child(${inventory.inventoryId})`);
        inventoryRow.innerHTML = `
        <td>${updatedInventory.inventoryId}</td>
        <td>${updatedInventory.warehouse.warehouseName}</td>
        <td>${updatedInventory.product.productName}</td>
        <td>${updatedInventory.quantity}</td>
        <td>
            <button class="edit-button" onclick="editInventory(${updatedInventory.inventoryId})">Edit</button>
        </td>
        <td>
            <button class="delete-button" onclick="deleteInventoryConfirmation(${updatedInventory.inventoryId})">Delete</button>
        </td>
        `;
        // Toggle back to the new inventory form
        toggleForms('new-inventory-form');
    }
}

// Function to handle the cancel button click in the update inventory form
function handleUpdateCancelButtonClick() {
    toggleForms('new-inventory-form');
}

// Function to handle the delete button click in the inventory row
async function deleteInventoryConfirmation(inventoryId) {
    const confirmation = confirm('Are you sure you want to delete this inventory?');
    if (confirmation) {
        const inventory = await getInventoryById(inventoryId);
        if (inventory) {
            deleteInventory(inventory);
            const inventoryRow = document.querySelector(`#inventory-table-body tr:nth-child(${inventoryId})`);
            inventoryRow.remove();
        }
    }
}

// Function to toggle between the new inventory form and the update inventory form
function toggleForms(formId) {
    const newInventoryForm = document.getElementById('new-inventory-form');
    const updateInventoryForm = document.getElementById('update-inventory-form');
    const deleteInventoryForm = document.getElementById('delete-inventory-form');

    if (formId === 'new-inventory-form') {
        newInventoryForm.style.display = 'block';
        updateInventoryForm.style.display = 'none';
        deleteInventoryForm.style.display = 'none';
    } else if (formId === 'update-inventory-form') {
        newInventoryForm.style.display = 'none';
        updateInventoryForm.style.display = 'block';
        deleteInventoryForm.style.display = 'none';
    } else if (formId === 'delete-inventory-form') {
        newInventoryForm.style.display = 'none';
        updateInventoryForm.style.display = 'none';
        deleteInventoryForm.style.display = 'block';
    }
}

// Function to handle the edit button click in the inventory row
async function editInventory(inventoryId) {
    await populateUpdateInventoryForm(inventoryId);
    toggleForms('update-inventory-form');
}

// Function to handle the delete button click in the inventory row
async function deleteInventoryConfirmation(inventoryId) {
    const confirmation = confirm('Are you sure you want to delete this inventory?');
    if (confirmation) {
        const inventory = await getInventoryById(inventoryId);
        if (inventory) {
            deleteInventory(inventory);
            const inventoryRow = document.querySelector(`#inventory-table-body tr:nth-child(${inventoryId})`);
            inventoryRow.remove();
        }
    }
}

// Function to handle the cancel button click in the delete inventory form
function handleDeleteCancelButtonClick() {
    toggleForms('new-inventory-form');
}

// Initial setup
document.getElementById('new-inventory-form').addEventListener('submit', handleNewInventoryFormSubmit);
document.getElementById('update-inventory-form').addEventListener('submit', handleUpdateInventoryFormSubmit);
document.getElementById('update-cancel-button').addEventListener('click', handleUpdateCancelButtonClick);
document.getElementById('delete-cancel-button').addEventListener('click', handleDeleteCancelButtonClick);

populateInventoryTable();