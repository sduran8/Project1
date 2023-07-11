package com.toycompany.toycompany.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.toycompany.toycompany.models.Warehouse;
import com.toycompany.toycompany.repositories.WarehouseRepository;

@Service
public class WarehouseService {

    /* Attributes */
    @Autowired
    WarehouseRepository warehouseRepository;

    /* Returns all warehouses */

    public List<Warehouse> findAllWarehouses() {
        return warehouseRepository.findAll();
    }

    /* Returns warehouse based on a given ID */

    public Warehouse findWarehouseById(int id) {
        Optional<Warehouse> warehouse = warehouseRepository.findById(id);
        if (warehouse.isPresent())
            return warehouse.get();
        return null;
    }

    /* Returns warehouse(s) based on a given name */

    public List<Warehouse> findWarehousesByName(String name) {
        Optional<List<Warehouse>> warehouse = warehouseRepository.findAllByWarehouseName(name);
        if (warehouse.isPresent())
            return warehouse.get();
        return null;
    }

    /* Returns warehouse(s) based on a given location */

    public List<Warehouse> findWarehousesByLocation(String location) {
        Optional<List<Warehouse>> warehouse = warehouseRepository.findAllByWarehouseName(location);
        if (warehouse.isPresent())
            return warehouse.get();
        return null;
    }

    /* Returns warehouse(s) based on a given address */

    public List<Warehouse> findWarehousesByAddress(String address) {
        Optional<List<Warehouse>> warehouse = warehouseRepository.findAllByWarehouseName(address);
        if (warehouse.isPresent())
            return warehouse.get();
        return null;
    }

    /* Saves an individual warehouse to the DB */

    public Warehouse saveWarehouse(Warehouse warehouse) {
        return warehouseRepository.save(warehouse);
    }

    /* Updates the maximum capacity of a warehouse */

    public int updateMaximumCapacity(Warehouse warehouse, int newCapacity) {
        return warehouseRepository.updateWarehouseMaximumCapacity(warehouse.getWarehouseId(), newCapacity);
    }

    /* Deletes a warehouse from the DB */

    public void deleteWarehouse(Warehouse warehouse) {
        warehouseRepository.delete(warehouse);
    }
}
