package com.toycompany.toycompany.repositories;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.toycompany.toycompany.models.Warehouse;

@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse, Integer> {

    /* Queries the Warehouse table based on a given name */

    public Optional<List<Warehouse>> findAllByWarehouseName(String name);

    /* Queries the Warehouse table based on a given location */
    
    public Optional<List<Warehouse>> findAllByWarehouseLocation(String location);
    
    /* Queries the Warehouse table based on a given address */

    public Optional<List<Warehouse>> findAllByWarehouseAddress(String address);

    /* Queries the Warehouse table to update the capacity of a warehouse */

    @Modifying
    @Transactional
    @Query("UPDATE Warehouse w SET w.warehouseMaximumCapacity = :newCapacity WHERE w.warehouseId = :warehouseId")
    public int updateWarehouseMaximumCapacity(@Param("warehouseId") int warehouseId, @Param("newCapacity") int newCapacity);
    
}
