package com.toycompany.toycompany.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "WAREHOUSE")
public class Warehouse {

    /* ATTRIBUTES */

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int warehouseId;

    @Column(name = "warehouse_name")
    private String warehouseName;

    @Column(name = "warehouse_maximum_capacity")
    private int warehouseMaximumCapacity;

    @Column(name = "warehouse_location")
    private String warehouseLocation;

    @Column(name = "warehouse_address")
    private String warehouseAddress;

    /* CONSTRUCTORS */

    public Warehouse() {}

    public Warehouse(int warehouseId, String warehouseName, int warehouseMaximumCapacity, String warehouseLocation, String warehouseAddress) {
        this.warehouseId = warehouseId;
        this.warehouseName = warehouseName;
        this.warehouseMaximumCapacity = warehouseMaximumCapacity;
        this.warehouseLocation = warehouseLocation;
        this.warehouseAddress = warehouseAddress;
    }
    
    /* GETTERS */
    
    public int getWarehouseId() { return warehouseId; }
    public String getWarehouseName() { return warehouseName; }
    public int getWarehouseMaximumCapacity() { return warehouseMaximumCapacity; }
    public String getWarehouseLocation() { return warehouseLocation; }
    public String getWarehouseAddress() { return warehouseAddress; }

    /* SETTERS */

    public void setWarehouseId(int warehouseId) { this.warehouseId = warehouseId; }
    public void setWarehouseName(String warehouseName) { this.warehouseName = warehouseName; }
    public void setWarehouseMaximumCapacity(int warehouseMaximumCapacity) { this.warehouseMaximumCapacity = warehouseMaximumCapacity; }
    public void setWarehouseLocation(String warehouseLocation) { this.warehouseLocation = warehouseLocation; }
    public void setWarehouseAddress(String warehouseAddress) { this.warehouseAddress = warehouseAddress; }

    /* ADDITIONAL METHODS */

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + warehouseId;
        result = prime * result + ((warehouseName == null) ? 0 : warehouseName.hashCode());
        result = prime * result + warehouseMaximumCapacity;
        result = prime * result + ((warehouseLocation == null) ? 0 : warehouseLocation.hashCode());
        result = prime * result + ((warehouseAddress == null) ? 0 : warehouseAddress.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null) return false;
        if (getClass() != obj.getClass()) return false;

        Warehouse other = (Warehouse) obj;

        if (warehouseId != other.warehouseId) return false;

        if (warehouseName == null) { if (other.warehouseName != null) return false;
        } else if (!warehouseName.equals(other.warehouseName)) return false;

        if (warehouseMaximumCapacity != other.warehouseMaximumCapacity) return false;

        if (warehouseLocation == null) { if (other.warehouseLocation != null) return false;
        } else if (!warehouseLocation.equals(other.warehouseLocation)) return false;

        if (warehouseAddress == null) { if (other.warehouseAddress != null) return false;
        } else if (!warehouseAddress.equals(other.warehouseAddress)) return false;

        return true;
    }

    @Override
    public String toString() {
        return "Warehouse [warehouseId=" + warehouseId + 
                ", warehouseName=" + warehouseName + 
                ", warehouseMaximumCapacity=" + warehouseMaximumCapacity + 
                ", warehouseLocation=" + warehouseLocation + 
                ", warehouseAddress=" + warehouseAddress + "]";
    }
}