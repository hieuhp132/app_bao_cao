package myapp.repository;
import myapp.model.Report;

import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
        @Query(nativeQuery = true, value = """
        SELECT city, SUM(sales) AS totalSales 
        FROM report 
        GROUP BY city 
        ORDER BY totalSales DESC 
        LIMIT 1
        """)
    Map<String, Object> findTopCityBySales();
}
