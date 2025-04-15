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

    private String customername;
    private double priceeach;
    private double sales;
    private String orderdate;
    private String status;
    private String productline;
    private int quantity;
    private String city;
    private String country;
    // Constructor
    public Report(String customername, double priceeach, double sales, String orderdate, String status, 
                 String productline, int quantity, String city, String country) {
        this.customername = customername;
        this.priceeach = priceeach;
        this.sales = sales;
        this.orderdate = orderdate;
        this.status = status;
        this.productline = productline;
        this.quantity = quantity;
        this.city = city;
        this.country = country;
    }
      // Getter và Setter cho customername
    public String getCustomername() {
        return customername;
    }

    public void setCustomername(String customername) {
        this.customername = customername;
    }

    // Getter và Setter cho priceeach
    public double getPriceeach() {
        return priceeach;
    }

    public void setPriceeach(double priceeach) {
        this.priceeach = priceeach;
    }

    // Getter và Setter cho sales
    public double getSales() {
        return sales;
    }

    public void setSales(double sales) {
        this.sales = sales;
    }

    // Getter và Setter cho orderdate
    public String getOrderdate() {
        return orderdate;
    }

    public void setOrderdate(String orderdate) {
        this.orderdate = orderdate;
    }

    // Getter và Setter cho status
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // Getter và Setter cho productline
    public String getProductline() {
        return productline;
    }

    public void setProductline(String productline) {
        this.productline = productline;
    }

    // Getter và Setter cho quantity
    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    // Getter và Setter cho city
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    // Getter và Setter cho country
    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}
