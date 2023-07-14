// Function to fetch all products from the server
async function getAllProducts() {
    try {
        const response = await fetch('http://localhost:8282/products');
        if (!response.ok) {
            throw new Error('Unable to fetch products.');
        }
        const products = await response.json();
        return products;
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Function to fetch a product by ID from the server
async function getProductById(productId) {
    try {
        const response = await fetch(`http://localhost:8282/products/product/${productId}`);
        if (!response.ok) {
            throw new Error(`Unable to fetch product with ID: ${productId}`);
        }
        const product = await response.json();
        return product;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Function to create a new product
async function createProduct(product) {
    try {
        const response = await fetch('http://localhost:8282/products/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        if (!response.ok) {
            throw new Error('Unable to create the product.');
        }
        const createdProduct = await response.json();
        return createdProduct;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Function to update a product
async function updateProduct(product) {
    try {
        const response = await fetch('http://localhost:8282/products/product', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        if (!response.ok) {
            throw new Error('Unable to update the product.');
        }
        const updatedProduct = await response.json();
        return updatedProduct;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Function to delete a product
async function deleteProduct(product) {
    try {
        const response = await fetch('http://localhost:8282/products/product', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        if (!response.ok) {
            throw new Error('Unable to delete the product.');
        }
    } catch (error) {
        console.error(error);
    }
}

// Function to display the product data in the table
function displayProductData(product) {
    const productTableBody = document.getElementById('product-table-body');
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${product.productId}</td>
    <td>${product.productName}</td>
    <td>${product.productCategory}</td>
    <td>${product.productDescription}</td>
    <td>${product.productPrice}</td>
    <td>${product.productDimensions}</td>
    <td>${product.productWeight}</td>
    <td>
      <button class="edit-button" onclick="editProduct(${product.productId})">Edit</button>
    </td>
    <td>
      <button class="delete-button" onclick="deleteProductConfirmation(${product.productId})">Delete</button>
    </td>
  `;
    productTableBody.appendChild(row);
}

// Function to populate the table with product data
async function populateProductTable() {
    const products = await getAllProducts();
    const productTableBody = document.getElementById('product-table-body');
    productTableBody.innerHTML = '';

    if (products.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = '<td colspan="9">No products found.</td>';
        productTableBody.appendChild(emptyRow);
    } else {
        products.forEach((product) => {
            displayProductData(product);
        });
    }
}

// Function to clear the input fields in the new product form
function clearNewProductForm() {
    document.getElementById('new-product-id').value = '';
    document.getElementById('new-product-name').value = '';
    document.getElementById('new-product-category').value = '';
    document.getElementById('new-product-description').value = '';
    document.getElementById('new-product-price').value = '';
    document.getElementById('new-product-dimensions').value = '';
    document.getElementById('new-product-weight').value = '';
}

// Function to handle the form submission for creating a new product
async function handleNewProductFormSubmit(event) {
    event.preventDefault();

    const product = {
        productName: document.getElementById('new-product-name').value,
        productCategory: document.getElementById('new-product-category').value,
        productDescription: document.getElementById('new-product-description').value,
        productPrice: parseFloat(document.getElementById('new-product-price').value),
        productDimensions: document.getElementById('new-product-dimensions').value,
        productWeight: parseFloat(document.getElementById('new-product-weight').value),
    };

    const createdProduct = await createProduct(product);
    if (createdProduct) {
        displayProductData(createdProduct);
        clearNewProductForm();
    }
}

// Function to populate the update product form with the product data
async function populateUpdateProductForm(productId) {
    const product = await getProductById(productId);
    if (product) {
        document.getElementById('update-product-id').value = product.productId;
        document.getElementById('update-product-name').value = product.productName;
        document.getElementById('update-product-category').value = product.productCategory;
        document.getElementById('update-product-description').value = product.productDescription;
        document.getElementById('update-product-price').value = product.productPrice;
        document.getElementById('update-product-dimensions').value = product.productDimensions;
        document.getElementById('update-product-weight').value = product.productWeight;
    }
}

// Function to handle the form submission for updating a product
async function handleUpdateProductFormSubmit(event) {
    event.preventDefault();

    const product = {
        productId: parseInt(document.getElementById('update-product-id').value),
        productName: document.getElementById('update-product-name').value,
        productCategory: document.getElementById('update-product-category').value,
        productDescription: document.getElementById('update-product-description').value,
        productPrice: parseFloat(document.getElementById('update-product-price').value),
        productDimensions: document.getElementById('update-product-dimensions').value,
        productWeight: parseFloat(document.getElementById('update-product-weight').value),
    };

    const updatedProduct = await updateProduct(product);
    if (updatedProduct) {
        const productRow = document.querySelector(`#product-table-body tr:nth-child(${product.productId})`);
        productRow.innerHTML = `
      <td>${updatedProduct.productId}</td>
      <td>${updatedProduct.productName}</td>
      <td>${updatedProduct.productCategory}</td>
      <td>${updatedProduct.productDescription}</td>
      <td>${updatedProduct.productPrice}</td>
      <td>${updatedProduct.productDimensions}</td>
      <td>${updatedProduct.productWeight}</td>
      <td>
        <button class="edit-button" onclick="editProduct(${updatedProduct.productId})">Edit</button>
      </td>
      <td>
        <button class="delete-button" onclick="deleteProductConfirmation(${updatedProduct.productId})">Delete</button>
      </td>
    `;
        toggleForms('new-product-form');
    }
}

// Function to handle the cancel button click in the update product form
function handleUpdateCancelButtonClick() {
    toggleForms('new-product-form');
}

// Function to handle the delete button click in the product row
async function deleteProductConfirmation(productId) {
    const confirmation = confirm('Are you sure you want to delete this product?');
    if (confirmation) {
        const product = await getProductById(productId);
        if (product) {
            deleteProduct(product);
            const productRow = document.querySelector(`#product-table-body tr:nth-child(${productId})`);
            productRow.remove();
        }
    }
}

// Function to toggle between the new product form and the update product form
function toggleForms(formId) {
    const newProductForm = document.getElementById('new-product-form');
    const updateProductForm = document.getElementById('update-product-form');
    const deleteProductForm = document.getElementById('delete-product-form');

    if (formId === 'new-product-form') {
        newProductForm.style.display = 'block';
        updateProductForm.style.display = 'none';
        deleteProductForm.style.display = 'none';
    } else if (formId === 'update-product-form') {
        newProductForm.style.display = 'none';
        updateProductForm.style.display = 'block';
        deleteProductForm.style.display = 'none';
    } else if (formId === 'delete-product-form') {
        newProductForm.style.display = 'none';
        updateProductForm.style.display = 'none';
        deleteProductForm.style.display = 'block';
    }
}

// Function to handle the edit button click in the product row
async function editProduct(productId) {
    await populateUpdateProductForm(productId);
    toggleForms('update-product-form');
}

// Function to handle the delete button click in the product row
async function deleteProductConfirmation(productId) {
    const confirmation = confirm('Are you sure you want to delete this product?');
    if (confirmation) {
        const product = await getProductById(productId);
        if (product) {
            deleteProduct(product);
            const productRow = document.querySelector(`#product-table-body tr:nth-child(${productId})`);
            productRow.remove();
        }
    }
}

// Function to handle the cancel button click in the delete product form
function handleDeleteCancelButtonClick() {
    toggleForms('new-product-form');
}

// Initial setup
document.getElementById('new-product-form').addEventListener('submit', handleNewProductFormSubmit);
document.getElementById('update-product-form').addEventListener('submit', handleUpdateProductFormSubmit);
document.getElementById('update-cancel-button').addEventListener('click', handleUpdateCancelButtonClick);
document.getElementById('delete-cancel-button').addEventListener('click', handleDeleteCancelButtonClick);

populateProductTable();