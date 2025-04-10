package com.company.sales_reporting_system.repository;

import com.company.sales_reporting_system.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {
    // Các phương thức truy vấn tùy chỉnh nếu cần
}
