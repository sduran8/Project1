package com.toycompany.toycompany.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "PRODUCT")
public class Product {

    /* ATTRIBUTES */

    @Id
    @Column(name = "product_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "product_category")
    private String productCategory;

    @Column(name = "product_description")
    private String productDescription;

    @Column(name = "product_price")
    private double productPrice;

    @Column(name = "product_dimensions")
    private String productDimensions;

    @Column(name = "product_weight")
    private double productWeight;


    /* CONSTRUCTORS */

    public Product() {}

    public Product(int productId, String productName, String productCategory, String productDescription, double productPrice, String productDimensions, double productWeight) {
        this.productId = productId;
        this.productName = productName;
        this.productCategory = productCategory;
        this.productDescription = productDescription;
        this.productPrice = productPrice;
        this.productDimensions = productDimensions;
        this.productWeight = productWeight;
    }
    
    /* GETTERS */

    public int getProductId() { return productId; } 
    public String getProductName() { return productName; }
    public String getProductCategory() { return productCategory; } 
    public String getProductDescription() { return productDescription; }
    public double getProductPrice() { return productPrice; }
    public String getProductDimensions() { return productDimensions; }
    public double getProductWeight() { return productWeight; }

    /* SETTERS */

    public void setProductId(int productId) { this.productId = productId; }
    public void setProductName(String productName) { this.productName = productName; }
    public void setProductCategory(String productCategory) { this.productCategory = productCategory; }
    public void setProductDescription(String productDescription) { this.productDescription = productDescription; }
    public void setProductPrice(double productPrice) { this.productPrice = productPrice; }
    public void setProductDimensions(String productDimensions) { this.productDimensions = productDimensions; }
    public void setProductWeight(double productWeight) { this.productWeight = productWeight; }

    /* ADDITIONAL METHODS */

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + productId;
        result = prime * result + ((productName == null) ? 0 : productName.hashCode());
        result = prime * result + ((productCategory == null) ? 0 : productCategory.hashCode());
        result = prime * result + ((productDescription == null) ? 0 : productDescription.hashCode());
        long temp;
        temp = Double.doubleToLongBits(productPrice);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        result = prime * result + ((productDimensions == null) ? 0 : productDimensions.hashCode());
        temp = Double.doubleToLongBits(productWeight);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null) return false;
        if (getClass() != obj.getClass()) return false;

        Product other = (Product) obj;

        if (productId != other.productId) return false;

        if (productName == null) { if (other.productName != null) return false;
        } else if (!productName.equals(other.productName)) return false;

        if (productCategory == null) { if (other.productCategory != null) return false;
        } else if (!productCategory.equals(other.productCategory)) return false;

        if (productDescription == null) { if (other.productDescription != null) return false;
        } else if (!productDescription.equals(other.productDescription)) return false;

        if (Double.doubleToLongBits(productPrice) != Double.doubleToLongBits(other.productPrice)) return false;

        if (productDimensions == null) { if (other.productDimensions != null) return false;
        } else if (!productDimensions.equals(other.productDimensions)) return false;

        if (Double.doubleToLongBits(productWeight) != Double.doubleToLongBits(other.productWeight)) return false;
        
        return true;
    }

    @Override
    public String toString() {
        return "Product [productId=" + productId + 
                ", productName=" + productName + 
                ", productCategory=" + productCategory + 
                ", productDescription=" + productDescription + 
                ", productPrice=" + productPrice + 
                ", productDimensions=" + productDimensions + 
                ", productWeight=" + productWeight + "]";
    }
}