console.log("Hello, frontend!");

const warehouseURL = 'http://localhost:8282/warehouses'
const productURL = 'http://localhost:8282/products'
const inventoryURL = 'http://localhost:8282/inventory'

let warehouses = []
let products = []
let inventory = []

//////////////////////////////////////////////////
///// GET REQUESTS ///////////////////////////////
//////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    // Warehouses
    let xhr1 = new XMLHttpRequest()
    xhr1.onreadystatechange = () => {
        if(xhr1.readyState == 4) {
            let w = JSON.parse(xhr1.responseText)
            w.forEach(newWarehouse => {
                addWarehouseToTable(newWarehouse)
            })
        }
    }
    xhr1.open('GET',warehouseURL)
    xhr1.send()

    //Products
    let xhr2 = new XMLHttpRequest()
    xhr2.onreadystatechange = () => {
        if (xhr2.readyState == 4) {
            let p = JSON.parse(xhr2.responseText)
            p.forEach(newProduct => {
                addProductToTable(newProduct)
            })
        }
    }
    xhr2.open('GET', productURL)
    xhr2.send()

    //Inventory
    let xhr3 = new XMLHttpRequest()
    xhr3.onreadystatechange = () => {
        if (xhr3.readyState == 4) {
            let i = JSON.parse(xhr3.responseText)
            i.forEach(newInventory => {
                addInventoryToTable(newInventory)
            })
        }
    }
    xhr3.open('GET', inventoryURL)
    xhr3.send()
})

function addWarehouseToTable(newWarehouse) {
    let tr = document.createElement('tr');
    let id = document.createElement('td');
    let name = document.createElement('td');
    let location = document.createElement('td');
    let address = document.createElement('td');
    let capacity = document.createElement('td');
    let editBtn = document.createElement('td');
    let deleteBtn = document.createElement('td');

    id.innerText = newWarehouse.warehouseId;
    name.innerText = newWarehouse.warehouseName;
    location.innerText = newWarehouse.warehouseLocation;
    address.innerText = newWarehouse.warehouseAddress;
    capacity.innerText = newWarehouse.warehouseMaximumCapacity;
    editBtn.innerHTML = `<button class="btn btn-sm" id="edit-button" onclick="activateEditForm(${newWarehouse.warehouseId})" style="background-color: rgb(133, 200, 135); transition: background-color 0.3s; cursor: pointer;" onmouseover="this.style.backgroundColor = 'rgb(170, 170, 170)'" onmouseout="this.style.backgroundColor = 'rgb(133, 200, 135)'">Edit</button>`;
    deleteBtn.innerHTML = `<button class="btn btn-sm" id="delete-button" onclick="activateDeleteForm(${newWarehouse.warehouseId})" style="background-color: rgb(242, 132, 132); border: none; transition: background-color 0.3s; cursor: pointer;" onmouseover="this.style.backgroundColor = 'rgb(170, 170, 170)'" onmouseout="this.style.backgroundColor = 'rgb(242, 132, 132)'">Delete</button>`;


    tr.appendChild(id);
    tr.appendChild(name);
    tr.appendChild(location);
    tr.appendChild(address);
    tr.appendChild(capacity);
    tr.appendChild(editBtn);
    tr.appendChild(deleteBtn);

    tr.setAttribute('id', 'TR' + newWarehouse.warehouseId);

    document.getElementById('warehouse-table-body').appendChild(tr);
    warehouses.push(newWarehouse);
}

function addProductToTable(newProduct) {
    let tr = document.createElement('tr');
    let id = document.createElement('td');
    let name = document.createElement('td');
    let category = document.createElement('td');
    let description = document.createElement('td');
    let price = document.createElement('td');
    let dimensions = document.createElement('td');
    let weight = document.createElement('td');
    let editBtn = document.createElement('td');
    let deleteBtn = document.createElement('td');

    id.innerText = newProduct.productId;
    name.innerText = newProduct.productName;
    category.innerText = newProduct.productCategory;
    description.innerText = newProduct.productDescription;
    price.innerText = newProduct.productPrice;
    dimensions.innerText = newProduct.productDimensions;
    weight.innerText = newProduct.productWeight;
    editBtn.innerHTML = `<button class="btn btn-sm" id="edit-button" onclick="activateEditForm(${newProduct.productId})" style="background-color: rgb(133, 200, 135); transition: background-color 0.3s; cursor: pointer;" onmouseover="this.style.backgroundColor = 'rgb(170, 170, 170)'" onmouseout="this.style.backgroundColor = 'rgb(133, 200, 135)'">Edit</button>`;
    deleteBtn.innerHTML = `<button class="btn btn-sm" id="delete-button" onclick="activateDeleteForm(${newProduct.productId})" style="background-color: rgb(242, 132, 132); border: none; transition: background-color 0.3s; cursor: pointer;" onmouseover="this.style.backgroundColor = 'rgb(170, 170, 170)'" onmouseout="this.style.backgroundColor = 'rgb(242, 132, 132)'">Delete</button>`;


    tr.appendChild(id);
    tr.appendChild(name);
    tr.appendChild(category);
    tr.appendChild(description);
    tr.appendChild(price);
    tr.appendChild(dimensions);
    tr.appendChild(weight);
    tr.appendChild(editBtn);
    tr.appendChild(deleteBtn);

    tr.setAttribute('id', 'TR' + newProduct.productId);

    document.getElementById('product-table-body').appendChild(tr);
    products.push(newProduct);
}

function addInventoryToTable(newInventory) {
    let tr = document.createElement('tr');
    let id = document.createElement('td');
    let warehouseId = document.createElement('td');
    let productId = document.createElement('td');
    let quantity = document.createElement('td');
    let editBtn = document.createElement('td');
    let deleteBtn = document.createElement('td');

    id.innerText = newInventory.inventoryId;
    warehouseId.innerText = newInventory.warehouse.warehouseName;
    productId.innerText = newInventory.product.productName;
    quantity.innerText = newInventory.quantity;
    editBtn.innerHTML = `<button class="btn btn-sm" id="edit-button" onclick="activateEditForm(${newInventory.inventoryId})" style="background-color: rgb(133, 200, 135); transition: background-color 0.3s; cursor: pointer;" onmouseover="this.style.backgroundColor = 'rgb(170, 170, 170)'" onmouseout="this.style.backgroundColor = 'rgb(133, 200, 135)'">Edit</button>`;
    deleteBtn.innerHTML = `<button class="btn btn-sm" id="delete-button" onclick="activateDeleteForm(${newInventory.inventoryId})" style="background-color: rgb(242, 132, 132); border: none; transition: background-color 0.3s; cursor: pointer;" onmouseover="this.style.backgroundColor = 'rgb(170, 170, 170)'" onmouseout="this.style.backgroundColor = 'rgb(242, 132, 132)'">Delete</button>`;


    tr.appendChild(id);
    tr.appendChild(warehouseId);
    tr.appendChild(productId);
    tr.appendChild(quantity);
    tr.appendChild(editBtn);
    tr.appendChild(deleteBtn);

    tr.setAttribute('id', 'TR' + newInventory.inventoryid);

    document.getElementById('inventory-table-body').appendChild(tr);
    inventory.push(newInventory);
}

//////////////////////////////////////////////////
///// POST REQUESTS //////////////////////////////
//////////////////////////////////////////////////

document.getElementById('new-warehouse-form').addEventListener('submit', (event) => {
    event.preventDefault();
    let inputData = new FormData(document.getElementById('new-warehouse-form'));
    let newWarehouse = {
        warehouseName : inputData.get('new-warehouse-name'),
        warehouseMaximumCapacity: inputData.get('new-warehouse-capacity'),
        warehouseLocation: inputData.get('new-warehouse-location'),
        warehouseAddress: inputData.get('new-warehouse-address'),
        }
    doPostRequest(newWarehouse);
});

document.getElementById('new-product-form').addEventListener('submit', (event) => {
    event.preventDefault();
    let inputData = new FormData(document.getElementById('new-product-form'));
    let newProduct = {
        productName: inputData.get('new-product-name'),
        productCategory: inputData.get('new-product-category'),
        productDescription: inputData.get('new-product-description'),
        productPrice: inputData.get('new-product-price'),
        productDimensions: inputData.get('new-product-dimensions'),
        productWeight: inputData.get('new-product-weight')
    }
    doPostRequest(newProduct);
});

document.getElementById('new-inventory-form').addEventListener('submit', (event) => {
    event.preventDefault();
    let inputData = new FormData(document.getElementById('new-inventory-form'));
    let warehouseName = inputData.get('new-warehouse-name');
    let productName = inputData.get('new-product-name');

    // Fetch the warehouse ID and product ID based on the provided names
    let warehouseId = getWarehouseIdByName(warehouseName);
    let productId = getProductIdByName(productName);

    // Validate if warehouse ID and product ID are valid
    if (warehouseId && productId) {
        let newInventory = {
            warehouseId: warehouseId,
            productId: productId,
            quantity: inputData.get('new-inventory-quantity')
        };
        doPostRequest(newInventory);
    } else {
        console.log('Invalid warehouse name or product name.');
    }
});

async function doPostRequest(newWarehouse) {
    let returnedData = await fetch(warehouseURL + '/warehouse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newWarehouse)
    });
    let warehouseJson = await returnedData.json();
    console.log('WAREHOUSE JSON' + warehouseJson);
    addWarehouseToTable(warehouseJson);
    document.getElementById('new-warehouse-form').reset();
}

async function doPostRequest(newProduct) {
    let returnedData = await fetch(productURL + '/product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    });
    let productJson = await returnedData.json();
    console.log('PRODUCT JSON' + productJson);
    addProductToTable(productJson);
    document.getElementById('new-product-form').reset();
}

async function doPostRequest(newInventory) {
    let returnedData = await fetch(inventoryURL + '/inventory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newInventory)
    });
    let inventoryJson = await returnedData.json();
    console.log('INVENTORY JSON' + inventoryJson);
    addInventoryToTable(inventoryJson);
    document.getElementById('new-inventory-form').reset();
}

/////////////////////////////////////////////////
///// PUT REQUEST AND CHANGING THE TABLE ////////
/////////////////////////////////////////////////

document.getElementById('update-warehouse-form').addEventListener('submit', (event) => {
    event.preventDefault();
    let inputData = new FormData(document.getElementById('update-warehouse-form'));
    let warehouse = {
        warehouseName: inputData.get('update-warehouse-name'),
        warehouseMaximumCapacity: inputData.get('update-warehouse-capacity'),
        warehouseLocation: inputData.get('update-warehouse-location'),
        warehouseAddress: inputData.get('update-warehouse-address')
    };
    fetch(warehouseURL + '/warehouse', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(warehouse)
    })
        .then((data) => {
            return data.json();
        })
        .then((warehouseJson) => {
            updateWarehouseInTable(warehouseJson);
            document.getElementById('update-warehouse-form').reset();
            document.getElementById('new-warehouse-form').style.display = 'block';
            document.getElementById('update-warehouse-form').style.display = 'none';
        })
        .catch((error) => {
            console.error(error);
        });
});

document.getElementById('update-product-form').addEventListener('submit', (event) => {
    event.preventDefault();
    let inputData = new FormData(document.getElementById('update-product-form'));
    let product = {
        productId: document.getElementById('update-product-id').value,
        productName: inputData.get('update-product-name'),
        productCategory: inputData.get('update-product-category'),
        productDescription: inputData.get('update-product-description'),
        productPrice: inputData.get('update-product-price'),
        productDimensions: inputData.get('update-product-dimensions'),
        productWeight: inputData.get('update-product-weight')
    };
    fetch(productURL + '/product', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product)
    })
        .then((data) => {
            return data.json();
        })
        .then((productJson) => {
            updateProductInTable(productJson);
            document.getElementById('update-product-form').reset();
            document.getElementById('new-product-form').style.display = 'block';
            document.getElementById('update-product-form').style.display = 'none';
        })
        .catch((error) => {
            console.error(error);
        });
});

document.getElementById('update-inventory-form').addEventListener('submit', (event) => {
    event.preventDefault();
    let inputData = new FormData(document.getElementById('update-inventory-form'));
    let warehouseName = inputData.get('update-inventory-warehouse-name');
    let productName = inputData.get('update-inventory-product-name');
    let warehouseId = getWarehouseIdByName(warehouseName);
    let productId = getProductIdByName(productName);
    let inventory = {
        warehouse_id: warehouseId,
        product_id: productId,
        quantity: inputData.get('update-inventory-quantity')
    };
    fetch(inventoryURL + '/inventory', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(inventory)
    })
        .then((data) => {
            return data.json();
        })
        .then((inventoryJson) => {
            updateInventoryInTable(inventoryJson);
            document.getElementById('update-inventory-form').reset();
            document.getElementById('new-inventory-form').style.display = 'block';
            document.getElementById('update-inventory-form').style.display = 'none';
        })
        .catch((error) => {
            console.error(error);
        });
});

function updateWarehouseInTable(warehouse) {
    document.getElementById('TR' + warehouse.warehouseId).innerHTML = `
    <td>${warehouse.warehouseId}</td>
    <td>${warehouse.warehouseName}</td>
    <td>${warehouse.warehouseLocation}</td>
    <td>${warehouse.warehouseAddress}</td>
    <td>${warehouse.warehouseMaximumCapacity}</td>
    <td><button class="btn btn-primary" id="editButton" onclick="activateEditForm(${warehouse.warehouseId})">Edit</button></td>
    <td><button class="btn btn-primary" id="deleteButton" onclick="activateDeleteForm(${warehouse.warehouseId})">Delete</button></td>
    `;
}

function updateProductInTable(product) {
    document.getElementById('TR' + product.productId).innerHTML = `
    <td>${product.productId}</td>
    <td>${product.productName}</td>
    <td>${product.productCategory}</td>
    <td>${product.productDescription}</td>
    <td>${product.productPrice}</td>
    <td>${product.productDimensions}</td>
    <td>${product.productWeight}</td>
    <td><button class="btn btn-primary" id="editButton" onclick="activateEditForm(${product.productId})">Edit</button></td>
    <td><button class="btn btn-primary" id="deleteButton" onclick="activateDeleteForm(${product.productId})">Delete</button></td>
    `;
}

function updateInventoryInTable(inventory) {
    document.getElementById('TR' + inventory.inventoryId).innerHTML = `
    <td>${inventory.inventoryId}</td>
    <td>${inventory.warehouseName}</td>
    <td>${inventory.productName}</td>
    <td>${inventory.quantity}</td>
    <td><button class="btn btn-primary" id="editButton" onclick="activateEditForm(${inventory.inventoryId})">Edit</button></td>
    <td><button class="btn btn-primary" id="deleteButton" onclick="activateDeleteForm(${inventory.inventoryId})">Delete</button></td>
    `;
}

//////////////////////////////////////////////////
///// DELETE REQUEST AND REMOVING FROM TABLE /////
//////////////////////////////////////////////////

document.getElementById('delete-warehouse-form').addEventListener('submit', (event) => {
    event.preventDefault();
    let warehouseId = document.getElementById('delete-warehouse-id').value;
    let warehouseName = document.getElementById('delete-warehouse-name').value;
    let warehouseLocation = document.getElementById('delete-warehouse-location').value;
    let warehouseAddress = document.getElementById('delete-warehouse-address').value;
    let warehouseCapacity = document.getElementById('delete-warehouse-capacity').value;
    let warehouse = {
        warehouseId: warehouseId,
        warehouseName: warehouseName,
        warehouseLocation: warehouseLocation,
        warehouseAddress: warehouseAddress,
        warehouseCapacity: warehouseCapacity
    };
    fetch(warehouseURL + '/warehouse', {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(warehouse)
    })
        .then((data) => {
            if (data.status === 204) {
                removeWarehouseFromTable(warehouse);
                resetAllForms();
            }
        })
        .catch((error) => {
            console.error(error);
        });
});

document.getElementById('delete-product-form').addEventListener('submit', (event) => {
    event.preventDefault();
    let productId = document.getElementById('delete-product-id').value;
    let productName = document.getElementById('delete-product-name').value;
    let productCategory = document.getElementById('delete-product-category').value;
    let productDescription = document.getElementById('delete-product-description').value;
    let productPrice = document.getElementById('delete-product-price').value;
    let productDimensions = document.getElementById('delete-product-dimensions').value;
    let productWeight = document.getElementById('delete-product-weight').value;

    let product = {
        productId: productId,
        productName: productName,
        productCategory: productCategory,
        productDescription: productDescription,
        productPrice: productPrice,
        productDimensions: productDimensions,
        productWeight: productWeight
    };
    fetch(productURL + '/product', {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product)
    })
        .then((data) => {
            if (data.status === 204) {
                removeProductFromTable(product);
                resetAllForms();
            }
        })
        .catch((error) => {
            console.error(error);
        });
});

document.getElementById('delete-inventory-form').addEventListener('submit', (event) => {
    event.preventDefault();
    let inventoryId = document.getElementById('delete-inventory-id').value;
    let warehouseName = document.getElementById('delete-inventory-warehouse-name').value;
    let productName = document.getElementById('delete-inventory-product-name').value;
    let quantity = document.getElementById('delete-inventory-quantity').value;
    let warehouseId = getWarehouseIdByName(warehouseName);
    let productId = getProductIdByName(productName);
    let inventory = {
        inventoryId: inventoryId,
        warehouseId: warehouseId,
        productId: productId,
        quantity: quantity
    };
    fetch(inventoryURL + '/inventory', {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(inventory)
    })
        .then((data) => {
            if (data.status === 204) {
                removeInventoryFromTable(inventory);
                resetAllForms();
            }
        })
        .catch((error) => {
            console.error(error);
        });
});

function removeWarehouseFromTable(warehouse) {
    const element = document.getElementById('TR' + warehouse.warehouseId);
    element.remove();
}

function removeProductFromTable(product) {
    // Removing the <tr> from the table when a product is deleted
    const element = document.getElementById('TR' + product.productId);
    element.remove();
}

function removeInventoryFromTable(inventory) {
    // Removing the <tr> from the table when an inventory item is deleted
    const element = document.getElementById('TR' + inventory.inventoryId);
    element.remove();
}

///////////////////////////////////////////
///// CANCEL BUTTONS AND FORM TOGGLES /////
///////////////////////////////////////////

document.getElementById('update-cancel-button').addEventListener('click', (event) => {
    event.preventDefault();
    resetAllForms();
});

document.getElementById('delete-cancel-button').addEventListener('click', (event) => {
    event.preventDefault();
    resetAllForms();

});

function resetAllForms() {
    document.getElementById('new-warehouse-form').reset();
    document.getElementById('update-warehouse-form').reset();
    document.getElementById('delete-warehouse-form').reset();
    document.getElementById('new-warehouse-form').style.display = 'block';
    document.getElementById('update-warehouse-form').style.display = 'none';
    document.getElementById('delete-warehouse-form').style.display = 'none';
    document.getElementById('new-product-form').reset();
    document.getElementById('update-product-form').reset();
    document.getElementById('delete-product-form').reset();
    document.getElementById('new-product-form').style.display = 'block';
    document.getElementById('update-product-form').style.display = 'none';
    document.getElementById('delete-product-form').style.display = 'none';
    document.getElementById('new-inventory-form').reset();
    document.getElementById('update-inventory-form').reset();
    document.getElementById('delete-inventory-form').reset();
    document.getElementById('new-inventory-form').style.display = 'block';
    document.getElementById('update-inventory-form').style.display = 'none';
    document.getElementById('delete-inventory-form').style.display = 'none';
}

function activateEditForm(entityId, entityType) {
    let entity;
    switch (entityType) {
        case 'warehouse':
            entity = warehouses.find(warehouse => warehouse.warehouseId === entityId);
            document.getElementById('update-warehouse-id').value = entity.warehouseId;
            document.getElementById('update-warehouse-name').value = entity.warehouseName;
            document.getElementById('update-warehouse-location').value = entity.warehouseLocation;
            document.getElementById('update-warehouse-address').value = entity.warehouseAddress;
            document.getElementById('update-warehouse-capacity').value = entity.warehouseMaximumCapacity;
            break;
        case 'product':
            entity = products.find(product => product.productId === entityId);
            document.getElementById('update-product-id').value = entity.productId;
            document.getElementById('update-product-name').value = entity.productName;
            document.getElementById('update-product-category').value = entity.productCategory;
            document.getElementById('update-product-description').value = entity.productDescription;
            document.getElementById('update-product-price').value = entity.productPrice;
            document.getElementById('update-product-dimensions').value = entity.productDimensions;
            document.getElementById('update-product-weight').value = entity.productWeight;
            break;
        case 'inventory':
            entity = inventory.find(item => item.inventoryId === entityId);
            document.getElementById('update-inventory-id').value = entity.inventoryId;
            document.getElementById('update-inventory-warehouse-id').value = entity.warehouseId;
            document.getElementById('update-inventory-product-id').value = entity.productId;
            document.getElementById('update-inventory-quantity').value = entity.quantity;
            break;
        default:
            break;
    }

    // showing only the edit form based on the entity type
    switch (entityType) {
        case 'warehouse':
            document.getElementById('new-warehouse-form').style.display = 'none';
            document.getElementById('update-warehouse-form').style.display = 'block';
            document.getElementById('delete-warehouse-form').style.display = 'none';
            break;
        case 'product':
            document.getElementById('new-product-form').style.display = 'none';
            document.getElementById('update-product-form').style.display = 'block';
            document.getElementById('delete-product-form').style.display = 'none';
            break;
        case 'inventory':
            document.getElementById('new-inventory-form').style.display = 'none';
            document.getElementById('update-inventory-form').style.display = 'block';
            document.getElementById('delete-inventory-form').style.display = 'none';
            break;
        default:
            break;
    }
}

function activateDeleteForm(entityId, entityType) {
    let entity;
    switch (entityType) {
        case 'warehouse':
            entity = warehouses.find(warehouse => warehouse.warehouseId === entityId);
            document.getElementById('delete-warehouse-id').value = entity.warehouseId;
            document.getElementById('delete-warehouse-name').value = entity.warehouseName;
            document.getElementById('delete-warehouse-location').value = entity.warehouseLocation;
            document.getElementById('delete-warehouse-address').value = entity.warehouseAddress;
            document.getElementById('delete-warehouse-capacity').value = entity.warehouseMaximumCapacity;
            break;
        case 'product':
            entity = products.find(product => product.productId === entityId);
            document.getElementById('delete-product-id').value = entity.productId;
            document.getElementById('delete-product-name').value = entity.productName;
            document.getElementById('delete-product-category').value = entity.productCategory;
            document.getElementById('delete-product-description').value = entity.productDescription;
            document.getElementById('delete-product-price').value = entity.productPrice;
            document.getElementById('delete-product-dimensions').value = entity.productDimensions;
            document.getElementById('delete-product-weight').value = entity.productWeight;
            break;
        case 'inventory':
            entity = inventory.find(item => item.inventoryId === entityId);
            document.getElementById('delete-inventory-id').value = entity.inventoryId;
            document.getElementById('delete-inventory-warehouse-id').value = entity.warehouseId;
            document.getElementById('delete-inventory-product-id').value = entity.productId;
            document.getElementById('delete-inventory-quantity').value = entity.quantity;
            break;
        default:
            break;
    }

    // showing only the delete form based on the entity type
    switch (entityType) {
        case 'warehouse':
            document.getElementById('new-warehouse-form').style.display = 'none';
            document.getElementById('update-warehouse-form').style.display = 'none';
            document.getElementById('delete-warehouse-form').style.display = 'block';
            break;
        case 'product':
            document.getElementById('new-product-form').style.display = 'none';
            document.getElementById('update-product-form').style.display = 'none';
            document.getElementById('delete-product-form').style.display = 'block';
            break;
        case 'inventory':
            document.getElementById('new-inventory-form').style.display = 'none';
            document.getElementById('update-inventory-form').style.display = 'none';
            document.getElementById('delete-inventory-form').style.display = 'block';
            break;
        default:
            break;
    }
}

//////////////////////////////////////////////////
///// HELPER METHODS /////////////////////////////
//////////////////////////////////////////////////

function getWarehouseIdByName(name) {
    for (let i = 0; i < warehouses.length; i++) {
        if (warehouses[i].warehouseName === name) {
            return warehouses[i].warehouseId;
        }
    }
    return null; 
}

function getProductIdByName(name) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].productName === name) {
            return products[i].productId;
        }
    }
    return null;
}