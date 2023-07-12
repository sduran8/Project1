package com.toycompany.toycompany.repositories;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.toycompany.toycompany.models.Inventory;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Integer> {
    
    /* Queries the Inventory table based on a given Product Id */

    public Optional<List<Inventory>> findAllByProduct_ProductId(int productId);

    /* Queries the Inventory table based on a given Warehouse Id */

    public Optional<List<Inventory>> findAllByWarehouse_WarehouseId(int warehouseId);

    /* Queries the Inventory table to update the quantity of an Inventory (Shipment) */

    @Modifying
    @Transactional
    @Query("UPDATE Inventory i SET i.quantity = :newQuantity WHERE i.inventoryId = :inventoryId")
    int updateInventoryQuantity(@Param("inventoryId") int inventoryId, @Param("newQuantity") int newQuantity);

}
