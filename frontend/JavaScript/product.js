// Function to send GET request to fetch all products
async function getAllProducts() {
    try {
        const response = await fetch("http://localhost:8282/products");
        if (!response.ok) {
            throw new Error("Error retrieving products");
        }
        const products = await response.json();
        return products;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Function to send GET request to fetch a product by ID
async function getProductById(productId) {
    try {
        const response = await fetch(
            `http://localhost:8282/products/product/${productId}`
        );
        if (!response.ok) {
            throw new Error(`Error retrieving product with ID ${productId}`);
        }
        const product = await response.json();
        return product;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Function to send POST request to create a new product
async function createProduct(product) {
    try {
        const response = await fetch("http://localhost:8282/products/product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });
        if (!response.ok) {
            throw new Error("Error creating product");
        }
        const newProduct = await response.json();
        return newProduct;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Function to send PUT request to update a product
async function updateProduct(product) {
    try {
        const response = await fetch("http://localhost:8282/products/product", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });
        if (!response.ok) {
            throw new Error(`Error updating product with ID ${product.productId}`);
        }
        const updatedProduct = await response.json();
        return updatedProduct;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Function to send DELETE request to delete a product
async function deleteProduct(productId) {
    try {
        const response = await fetch("http://localhost:8282/products/product", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId }),
        });
        if (!response.ok) {
            throw new Error(`Error deleting product with ID ${productId}`);
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

// Function to handle form submission for creating or updating a product
async function handleFormSubmit(event) {
    event.preventDefault();

    // Get the form data
    const productId = document.getElementById("new-product-id").value;
    const productName = document.getElementById("new-product-name").value;
    const productCategory = document.getElementById("new-product-category").value;
    const productDescription = document.getElementById(
        "new-product-description"
    ).value;
    const productPrice = document.getElementById("new-product-price").value;
    const productDimensions = document.getElementById(
        "new-product-dimensions"
    ).value;
    const productWeight = document.getElementById("new-product-weight").value;

    // Create a product object
    const product = {
        productId: Number(productId),
        productName,
        productCategory,
        productDescription,
        productPrice: parseFloat(productPrice),
        productDimensions,
        productWeight: parseFloat(productWeight),
    };

    // Check if it's a new product or an update
    if (!productId) {
        // Create a new product
        const newProduct = await createProduct(product);
        if (newProduct) {
            // Clear the form fields
            clearFormFields();
            // Fetch all products again and update the table
            fetchAllProductsAndUpdateTable();
        }
    } else {
        // Update an existing product
        const updatedProduct = await updateProduct(product);
        if (updatedProduct) {
            // Clear the form fields
            clearFormFields();
            // Fetch all products again and update the table
            fetchAllProductsAndUpdateTable();
        }
    }
}

// Function to handle product deletion
async function handleProductDeletion(productId) {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (confirmed) {
        const success = await deleteProduct(productId);
        if (success) {
            // Fetch all products again and update the table
            fetchAllProductsAndUpdateTable();
        }
    }
}

// Function to populate the form fields with product data for editing
function populateFormFields(product) {
    document.getElementById("new-product-id").value = product.productId;
    document.getElementById("new-product-name").value = product.productName;
    document.getElementById("new-product-category").value = product.productCategory;
    document.getElementById("new-product-description").value =
        product.productDescription;
    document.getElementById("new-product-price").value = product.productPrice.toFixed(
        2
    );
    document.getElementById("new-product-dimensions").value =
        product.productDimensions;
    document.getElementById("new-product-weight").value = product.productWeight.toFixed(
        2
    );
}

// Function to clear the form fields
function clearFormFields() {
    document.getElementById("new-product-id").value = "";
    document.getElementById("new-product-name").value = "";
    document.getElementById("new-product-category").value = "";
    document.getElementById("new-product-description").value = "";
    document.getElementById("new-product-price").value = "";
    document.getElementById("new-product-dimensions").value = "";
    document.getElementById("new-product-weight").value = "";
}

// Function to fetch all products, update the table, and set event listeners
async function fetchAllProductsAndUpdateTable() {
    const products = await getAllProducts();
    if (products) {
        const tableBody = document.getElementById("product-table-body");
        tableBody.innerHTML = ""; // Clear the existing table rows

        products.forEach((product) => {
            const row = document.createElement("tr");

            const idCell = document.createElement("td");
            idCell.textContent = product.productId;
            row.appendChild(idCell);

            const nameCell = document.createElement("td");
            nameCell.textContent = product.productName;
            row.appendChild(nameCell);

            const categoryCell = document.createElement("td");
            categoryCell.textContent = product.productCategory;
            row.appendChild(categoryCell);

            const descriptionCell = document.createElement("td");
            descriptionCell.textContent = product.productDescription;
            row.appendChild(descriptionCell);

            const priceCell = document.createElement("td");
            priceCell.textContent = product.productPrice.toFixed(2);
            row.appendChild(priceCell);

            const dimensionsCell = document.createElement("td");
            dimensionsCell.textContent = product.productDimensions;
            row.appendChild(dimensionsCell);

            const weightCell = document.createElement("td");
            weightCell.textContent = product.productWeight.toFixed(2);
            row.appendChild(weightCell);

            const editCell = document.createElement("td");
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.classList.add("button"); // Add button class
            editButton.addEventListener("click", () => {
                populateFormFields(product);
            });
            editCell.appendChild(editButton);
            row.appendChild(editCell);

            const deleteCell = document.createElement("td");
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("button"); // Add button class
            deleteButton.addEventListener("click", () => {
                handleProductDeletion(product.productId);
            });
            deleteCell.appendChild(deleteButton);
            row.appendChild(deleteCell);

            tableBody.appendChild(row);
        });
    }
}

// Event listener for form submission
const form = document.getElementById("new-product-form");
form.addEventListener("submit", handleFormSubmit);

// Fetch all products and update the table on page load
fetchAllProductsAndUpdateTable();
