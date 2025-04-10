package com.company.sales_reporting_system.repository;

import com.company.sales_reporting_system.model.Store;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreRepository extends JpaRepository<Store, Long> {
    // Các phương thức truy vấn tùy chỉnh nếu cần
}
