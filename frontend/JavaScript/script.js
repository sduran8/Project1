console.log("Hello, frontend!");

const warehouseURL = 'http://localhost:8282/warehouses'
const productURL = 'http://localhost:8282/products'
const inventoryURL = 'http://localhost:8282/inventory'

let warehouses = []
let products = []
let inventory = []

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

    tr.setAttribute('id', 'TR' + newInventory.inventory_id);

    document.getElementById('inventory-table-body').appendChild(tr);
    inventory.push(newInventory);
}

