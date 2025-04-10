package com.company.sales_reporting_system.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String region;  // Khu vực
    private Double salesAmount;  // Doanh thu
    private String status;  // Trạng thái (đỏ, đen, xanh, tim)


    public Store(long id, String name, String region, double salesAmount, String status) {
        this.id = id;
        this.name = name;
        this.region = region;
        this.salesAmount = salesAmount;
        this.status = status;
    }

    // Getter và Setter
    public Double getSalesAmount() {
        return this.salesAmount;
    }

    public String getStatus() {
        return this.status;
    }

    public void setSalesAmount(Double amount) {
        this.salesAmount = amount;
    }

    public void setStatus(String status) {
        this.status = status;
    }


}
