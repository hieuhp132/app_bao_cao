package myapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "report")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String orderDate;
    private String productCode;
    private String productName;
    private String category;
    private int quantity;
    private double price;
    private double priceSummary;
    private String city;

    // Constructor with parameters
    public Report(String orderDate, String productCode, String productName, String category, 
                  int quantity, double price, double priceSummary, String city) {
        this.orderDate = orderDate;
        this.productCode = productCode;
        this.productName = productName;
        this.category = category;
        this.quantity = quantity;
        this.price = price;
        this.priceSummary = priceSummary;
        this.city = city;
        // Add the country property if needed.
    }

    // Default constructor (no-args)
    public Report() {}

    // Getters and setters
    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getPriceSummary() {
        return priceSummary;
    }

    public void setPriceSummary(double priceSummary) {
        this.priceSummary = priceSummary;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    // Add getter and setter for country if necessary
}
