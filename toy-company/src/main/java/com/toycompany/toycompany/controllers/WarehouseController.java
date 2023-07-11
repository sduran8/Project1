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

import com.toycompany.toycompany.models.Warehouse;
import com.toycompany.toycompany.services.WarehouseService;

@RestController
@RequestMapping("/warehouses")
@CrossOrigin
public class WarehouseController {

     /* Attributes */

     @Autowired
     WarehouseService warehouseService;

    /* Returns all warehouses */

    @GetMapping
    public ResponseEntity<List<Warehouse>> findAllWarehouses() {
        List<Warehouse> warehouses = warehouseService.findAllWarehouses();
        return new ResponseEntity<List<Warehouse>>(warehouses, HttpStatus.OK);
    }

    /* Returns warehouses based on a given ID */

    @GetMapping("/warehouse/{id}")
    public ResponseEntity<Warehouse> findWarehouseById(@PathVariable int id) {
        Warehouse warehouse = warehouseService.findWarehouseById(id);
        return new ResponseEntity<Warehouse>(warehouse, HttpStatus.OK);
    }

    /* Returns warehouses(s) based on a given Name */

    @GetMapping("/name/{name}")
    public ResponseEntity<List<Warehouse>> findWarehousesByName(@PathVariable String name) {
        List<Warehouse> warehouses = warehouseService.findWarehousesByName(name);
        if (warehouses == null)
            return ResponseEntity.noContent().build();
        else
            return new ResponseEntity<List<Warehouse>>(warehouses, HttpStatus.OK);
    }

    /* Returns warehouses(s) based on a given Location */
    @GetMapping("/location/{location}")
    public ResponseEntity<List<Warehouse>> findWarehousesByLocation(@PathVariable String location) {
        List<Warehouse> warehouses = warehouseService.findWarehousesByName(location);
        if (warehouses == null)
            return ResponseEntity.noContent().build();
        else
            return new ResponseEntity<List<Warehouse>>(warehouses, HttpStatus.OK);
    }

    /* Returns warehouses(s) based on a given Address */

    @GetMapping("/address/{address}")
    public ResponseEntity<List<Warehouse>> findWarehousesByAddress(@PathVariable String address) {
        List<Warehouse> warehouses = warehouseService.findWarehousesByAddress(address);
        if (warehouses == null)
            return ResponseEntity.noContent().build();
        else
            return new ResponseEntity<List<Warehouse>>(warehouses, HttpStatus.OK);
    }

    /* Saves an individual warehouses to the DB */

    @PostMapping("/warehouse")
    public ResponseEntity<Warehouse> createWarehouse(@Valid @RequestBody Warehouse warehouse) {
        Warehouse newWarehouse = warehouseService.saveWarehouse(warehouse);
        return new ResponseEntity<Warehouse>(newWarehouse, HttpStatus.CREATED);
    }

    /* Updates a warehouses in the DB */

    @PutMapping("/warehouse")
    public ResponseEntity<Warehouse> updateWarehouse(@RequestBody Warehouse warehouse) {
        Warehouse newWarehouse = warehouseService.saveWarehouse(warehouse);
        return new ResponseEntity<Warehouse>(newWarehouse, HttpStatus.OK);
    }

    /* Updates the maximum capacity of a warehouse */

    @PutMapping("/warehouse/updateMaximumCapacity")
    public ResponseEntity<Integer> updateWarehouseMaximumCapacity(@RequestBody Warehouse warehouse, @RequestParam int newCapacity) {
        int updated = warehouseService.updateMaximumCapacity(warehouse, newCapacity);
        return new ResponseEntity<Integer>(updated, HttpStatus.OK);
    }

    /* Deletes a warehouse from the DB */

    @DeleteMapping("/warehouse")
    public ResponseEntity<Integer> deleteWarehouse(@RequestBody Warehouse warehouse) {
        warehouseService.deleteWarehouse(warehouse);
        return ResponseEntity.noContent().build();
    }
    
}
