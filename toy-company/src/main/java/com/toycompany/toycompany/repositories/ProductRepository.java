package com.toycompany.toycompany.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.toycompany.toycompany.models.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    
}
