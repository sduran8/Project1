package com.toycompany.toycompany.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.toycompany.toycompany.models.Product;
import com.toycompany.toycompany.repositories.ProductRepository;

@Service
public class ProductService {

    /* Attributes */

    @Autowired
    ProductRepository productRepository; 

    /* Returns all products */

    public List<Product> findAllProducts() {
        return productRepository.findAll();
    }

    /* Returns product based on a given ID */

    public Product findProductById(int id) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent())
            return product.get();
        return null;
    }

    /* Returns product(s) based on a given Category */

    public List<Product> findProductsByCategory(String category) {
        Optional<List<Product>> product = productRepository.findAllByProductCategory(category);
        if (product.isPresent())
            return product.get();
        return null;
    }

    /* Returns product(s) based on a given Price */

    public List<Product> findProductsByPrice(Double price) {
        Optional<List<Product>> product = productRepository.findAllByProductPrice(price);
        if (product.isPresent())
            return product.get();
        return null;
    }

    /* Saves an individual product to the DB */

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    /* Updates the description of a product */

    public int updateDescription(Product product, String newDescription) {
        return productRepository.updateProductDescription(product.getProductId(), newDescription);
    }

    /* Deletes a product from the DB */

    public void deleteProduct(Product product) {
        productRepository.delete(product);
    }
    
}
