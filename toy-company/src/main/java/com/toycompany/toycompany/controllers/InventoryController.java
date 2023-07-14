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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.toycompany.toycompany.models.Inventory;
import com.toycompany.toycompany.services.InventoryService;

@RestController
@RequestMapping("/inventory")
@CrossOrigin
public class InventoryController {
    
    /* Attributes */

    @Autowired
    InventoryService inventoryService;

    /* Returns all inventory */

    @GetMapping
    public ResponseEntity<List<Inventory>> findAllInventory() {
        List<Inventory> Inventorys = inventoryService.findAllInventory();
        return new ResponseEntity<List<Inventory>>(Inventorys, HttpStatus.OK);
    }

    /* Returns Inventory based on a given ID */

    @GetMapping("/shipment/{id}")
    public ResponseEntity<Inventory> findInventoryById(@PathVariable int id) {
        Inventory Inventory = inventoryService.findInventoryById(id);
        return new ResponseEntity<Inventory>(Inventory, HttpStatus.OK);
    }

    /* Returns Inventory based on a given Product ID */

    @GetMapping("/p_shipment/{productId}")
    public ResponseEntity<List<Inventory>> getAllInventoryByProductId(@PathVariable int productId) {
        List<Inventory> inventoryList = inventoryService.findAllInventoryByProductId(productId);
        if (inventoryList != null && !inventoryList.isEmpty()) {
            return new ResponseEntity<List<Inventory>>(inventoryList, HttpStatus.OK);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    /* Returns Inventory based on a given Warehouse ID */

    @GetMapping("/w_shipment/{warehouseId}")
    public ResponseEntity<List<Inventory>> getAllInventoryByWarehouseId(@PathVariable int warehouseId) {
        List<Inventory> inventoryList = inventoryService.findAllInventoryByWarehouseId(warehouseId);
        if (inventoryList != null && !inventoryList.isEmpty()) {
            return new ResponseEntity<List<Inventory>>(inventoryList, HttpStatus.OK);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    /* Saves an individual Inventory (shipment) to the DB */

    @PostMapping("/addinventory")
    public ResponseEntity<Inventory> createInventory(@Valid @RequestBody Inventory inventory) {
        Inventory newInventory = inventoryService.saveInventory(inventory);
        return new ResponseEntity<Inventory>(newInventory, HttpStatus.CREATED);
    }

    /* Updates a Inventory (shipment) in the DB */

    @PutMapping("/addinventory")
    public ResponseEntity<Inventory> updateInventory(@RequestBody Inventory inventory) {
        Inventory newInventory = inventoryService.saveInventory(inventory);
        return new ResponseEntity<Inventory>(newInventory, HttpStatus.OK);
    }

    /* Updates the maximum capacity of a Inventory */

    @PutMapping("/inventory/updateMaximumCapacity")
    public ResponseEntity<Integer> updateInventoryMaximumCapacity(@RequestBody Inventory inventory, @RequestParam int newCapacity) {
        int updated = inventoryService.updateMaximumCapacity(inventory, newCapacity);
        return new ResponseEntity<Integer>(updated, HttpStatus.OK);
    }

    /* Deletes a Inventory (shipment) from the DB */

    @DeleteMapping("/inventory")
    public ResponseEntity<Integer> deleteInventory(@RequestBody Inventory inventory) {
        inventoryService.deleteInventory(inventory);
        return ResponseEntity.noContent().build();
    }

}
