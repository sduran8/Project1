package com.toycompany.toycompany.repositories;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.toycompany.toycompany.models.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    /* Queries the Product table based on a given name */

    public Optional<List<Product>> findAllByProductName(String name);
    
    /* Queries the Product table based on a given category */

    public Optional<List<Product>> findAllByProductCategory(String category);

    /* Queries the Product table based on a given price */

    public Optional<List<Product>> findAllByProductPriceLessThanEqual(double price);

    /* Queries the Product table based on a given weight */

    public Optional<List<Product>> findAllByProductWeightLessThanEqual(double weight);

     /* Queries the Product table to update the description of a product */

     @Modifying
     @Transactional
     @Query("UPDATE Product p SET p.productDescription = :newDescription WHERE p.productId = :productId")
     public int updateProductDescription(@Param("productId") int productId, @Param("newDescription") String newDescription);

}
