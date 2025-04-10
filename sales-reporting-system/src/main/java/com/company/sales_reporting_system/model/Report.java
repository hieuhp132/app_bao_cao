package com.company.sales_reporting_system.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import java.time.LocalDate;

@Entity
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate date;
    private String status;  // Trạng thái của báo cáo (ví dụ: tốt, cần cải thiện...)
    private Double totalSales;  // Tổng doanh thu

    // Getter và Setter
}
