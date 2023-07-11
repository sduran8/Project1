package com.toycompany.toycompany.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.toycompany.toycompany.models.Product;
import com.toycompany.toycompany.services.ProductService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/products")
@CrossOrigin
public class ProductController {

    /* Attributes */

    @Autowired
    ProductService productService;

    /* Returns all products */

    @GetMapping
    public ResponseEntity<List<Product>> findAllProducts() {
        List<Product> products = productService.findAllProducts();
        return new ResponseEntity<List<Product>>(products, HttpStatus.OK);
    }

    /* Returns product based on a given ID */

    @GetMapping("/product/{id}")
    public ResponseEntity<Product> findProductById(@PathVariable int id) {
        Product product = productService.findProductById(id);
        return new ResponseEntity<Product>(product, HttpStatus.OK);
    }

    /* Returns product(s) based on a given Category */

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Product>> findProductsByCategory(@PathVariable String category) {
        List<Product> products = productService.findProductsByCategory(category);
        if (products == null)
            return ResponseEntity.noContent().build();
        else
            return new ResponseEntity<List<Product>>(products, HttpStatus.OK);
    }

    /* Returns product(s) based on a given Price */

    @GetMapping("/price/{price}")
    public ResponseEntity<List<Product>> findProductsByPrice(@PathVariable double price) {
        List<Product> products = productService.findProductsByPrice(price);
        if (products == null)
            return ResponseEntity.noContent().build();
        else
            return new ResponseEntity<List<Product>>(products, HttpStatus.OK);
    }

    /* Saves an individual product to the DB */

    @PostMapping("/product")
    public ResponseEntity<Product> createProduct(@Valid @RequestBody Product product) {
        Product newProduct = productService.saveProduct(product);
        return new ResponseEntity<Product>(newProduct, HttpStatus.CREATED);
    }

    /* Updates a product in the DB */

    @PutMapping("/product")
    public ResponseEntity<Product> updateProduct(@RequestBody Product product) {
        Product newProduct = productService.saveProduct(product);
        return new ResponseEntity<Product>(newProduct, HttpStatus.OK);
    }

    /* Updates the description of a product */

    @PutMapping("/product/updateDescription")
    public ResponseEntity<Integer> updateProductDescription(@RequestBody Product product,
            @RequestParam String description) {
        int updated = productService.updateDescription(product, description);
        return new ResponseEntity<Integer>(updated, HttpStatus.OK);
    }

    /* Deletes a product from the DB */

    @DeleteMapping("/product")
    public ResponseEntity<Integer> deleteProduct(@RequestBody Product product) {
        productService.deleteProduct(product);
        return ResponseEntity.noContent().build();
    }

    

}
