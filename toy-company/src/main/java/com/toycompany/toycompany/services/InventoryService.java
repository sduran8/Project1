package com.toycompany.toycompany.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.toycompany.toycompany.models.Inventory;
import com.toycompany.toycompany.models.Product;
import com.toycompany.toycompany.models.Warehouse;
import com.toycompany.toycompany.repositories.InventoryRepository;


@Service
public class InventoryService {

    /* Attributes */

    @Autowired
    InventoryRepository inventoryRepository;

    @Autowired
    WarehouseService warehouseService;

    @Autowired
    ProductService productService;

    /* Returns all inventory */

    public List<Inventory> findAllInventory() {
        return inventoryRepository.findAll();
    }

    /* Returns inventory based on a given ID */

    public Inventory findInventoryById(int id) {
        Optional<Inventory> inventory = inventoryRepository.findById(id);
        if (inventory.isPresent())
            return inventory.get();
        return null;
    }

    /* Returns inventory based on a given Product ID */

    public List<Inventory> findAllInventoryByProductId(int productId) {
        Optional<List<Inventory>> inventory = inventoryRepository.findAllByProduct_ProductId(productId);
        if (inventory.isPresent())
            return inventory.get();
        return null;
    }

    /* Returns inventory based on a given Warehouse ID */

    public List<Inventory> findAllInventoryByWarehouseId(int WarehouseId) {
        Optional<List<Inventory>> inventory = inventoryRepository.findAllByWarehouse_WarehouseId(WarehouseId);
        if (inventory.isPresent())
            return inventory.get();
        return null;
    }

    /* Saves an individual inventory (shipment) to the DB */

    public Inventory saveInventory(Inventory inventory) {
        Warehouse warehouseId = warehouseService.saveWarehouse(inventory.getWarehouse());
        Product productId = productService.saveProduct(inventory.getProduct());
        inventory.setWarehouse(warehouseId);
        inventory.setProduct(productId);
        return inventoryRepository.save(inventory);
    }

    /* Updates the maximum capacity of an inventory (shipment) */

    public int updateMaximumCapacity(Inventory inventory, int newCapacity) {
        return inventoryRepository.updateInventoryQuantity(inventory.getInventoryId(), newCapacity);
    }

    /* Deletes a inventory (shipment) from the DB */

    public void deleteInventory(Inventory inventory) {
        inventoryRepository.delete(inventory);
    }

    
}
