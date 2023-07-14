// Fetch all inventory
function fetchInventory() {
    fetch('http://localhost:8282/inventory')
        .then(response => response.json())
        .then(data => {
            // Process the data and update the inventory table
            updateInventoryTable(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Create or update inventory
function saveInventory(inventoryData) {
    let url = 'http://localhost:8282/inventory/inventory';
    let method = 'POST';

    if (inventoryData.inventoryId) {
        url += '/' + inventoryData.inventoryId;
        method = 'PUT';
    }

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(inventoryData),
    })
        .then(response => response.json())
        .then(data => {
            // Display success message or handle errors
            console.log('Inventory saved:', data);
            // Fetch inventory again to update the table
            fetchInventory();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Delete inventory
function deleteInventory(inventoryId) {
    fetch('http://localhost:8282/inventory/' + inventoryId, {
        method: 'DELETE',
    })
        .then(response => {
            // Display success message or handle errors
            console.log('Inventory deleted');
            // Fetch inventory again to update the table
            fetchInventory();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Event listener for form submission (create/update)
document.getElementById('new-inventory-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const inventoryData = {
        inventoryId: document.getElementById('new-inventory-id').value,
        warehouse: { name: document.getElementById('new-warehouse-name').value },
        product: { name: document.getElementById('new-product-name').value },
        quantity: parseInt(document.getElementById('new-inventory-quantity').value),
    };

    saveInventory(inventoryData);
});

// Event listener for form submission (update)
document.getElementById('update-inventory-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const inventoryData = {
        inventoryId: document.getElementById('update-inventory-id').value,
        warehouse: { name: document.getElementById('update-warehouse-name').value },
        product: { name: document.getElementById('update-product-name').value },
        quantity: parseInt(document.getElementById('update-inventory-quantity').value),
    };

    saveInventory(inventoryData);
});

// Event listener for delete button click
document.getElementById('delete-button').addEventListener('click', function () {
    const inventoryId = document.getElementById('delete-inventory-id').value;
    deleteInventory(inventoryId);
});

// Function to update the inventory table
function updateInventoryTable(inventoryData) {
    const tableBody = document.getElementById('inventory-table-body');
    tableBody.innerHTML = '';

    inventoryData.forEach(inventory => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = inventory.inventoryId;
        row.appendChild(idCell);

        const warehouseCell = document.createElement('td');
        warehouseCell.textContent = inventory.warehouse.name;
        row.appendChild(warehouseCell);

        const productCell = document.createElement('td');
        productCell.textContent = inventory.product.name;
        row.appendChild(productCell);

        const quantityCell = document.createElement('td');
        quantityCell.textContent = inventory.quantity;
        row.appendChild(quantityCell);

        const editCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function () {
            // Populate the update form with inventory data
            document.getElementById('update-inventory-id').value = inventory.inventoryId;
            document.getElementById('update-warehouse-name').value = inventory.warehouse.name;
            document.getElementById('update-product-name').value = inventory.product.name;
            document.getElementById('update-inventory-quantity').value = inventory.quantity;
            // Show the update form and hide the other forms
            document.getElementById('update-inventory-form').style.display = 'block';
            document.getElementById('new-inventory-form').style.display = 'none';
            document.getElementById('delete-inventory-form').style.display = 'none';
        });
        editCell.appendChild(editButton);
        row.appendChild(editCell);

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () {
            // Populate the delete form with inventory data
            document.getElementById('delete-inventory-id').value = inventory.inventoryId;
            document.getElementById('delete-warehouse-name').value = inventory.warehouse.name;
            document.getElementById('delete-product-name').value = inventory.product.name;
            document.getElementById('delete-inventory-quantity').value = inventory.quantity;
            // Show the delete form and hide the other forms
            document.getElementById('delete-inventory-form').style.display = 'block';
            document.getElementById('new-inventory-form').style.display = 'none';
            document.getElementById('update-inventory-form').style.display = 'none';
        });
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);
    });
}

// Fetch inventory when the page loads
fetchInventory();
