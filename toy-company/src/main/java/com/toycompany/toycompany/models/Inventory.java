package com.toycompany.toycompany.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "INVENTORY")
public class Inventory {

    /* ATTRIBUTES */

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int inventoryId;


    @ManyToOne
    @JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "quantity")
    private int quantity;

    /* CONSTRUCTORS */

    public Inventory() { }

    public Inventory(int inventoryId, Warehouse warehouse, Product product, int quantity) {
        this.inventoryId = inventoryId;
        this.warehouse = warehouse;
        this.product = product;
        this.quantity = quantity;
    }

    /* GETTERS */

    public int getInventoryId() { return inventoryId; }
    public Warehouse getWarehouse() { return warehouse; }
    public Product getProduct() { return product; }
    public int getQuantity() { return quantity; }

    /* SETTERS */

    public void setInventoryId(int inventoryId) { this.inventoryId = inventoryId; }
    public void setWarehouse(Warehouse warehouse) { this.warehouse = warehouse; }
    public void setProduct(Product product) { this.product = product; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    /* ADDITIONAL METHODS */

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + inventoryId;
        result = prime * result + ((warehouse == null) ? 0 : warehouse.hashCode());
        result = prime * result + ((product == null) ? 0 : product.hashCode());
        result = prime * result + quantity;
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null) return false;
        if (getClass() != obj.getClass()) return false;

        Inventory other = (Inventory) obj;

        if (inventoryId != other.inventoryId) return false;

        if (warehouse == null) { if (other.warehouse != null) return false;
        } else if (!warehouse.equals(other.warehouse)) return false;

        if (product == null) { if (other.product != null) return false;
        } else if (!product.equals(other.product)) return false;

        if (quantity != other.quantity) return false;

        return true;
    }

    @Override
    public String toString() {
        return "Inventory [inventoryId=" + inventoryId + 
                ", warehouse=" + warehouse + 
                ", product=" + product + 
                ", quantity=" + quantity + "]";
    }
}