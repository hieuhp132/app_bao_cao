package myapp.repository;
import myapp.model.Report;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
        @Query(nativeQuery = true, value = """
        SELECT city, SUM(price) AS totalSales 
        FROM report 
        GROUP BY city 
        ORDER BY totalSales DESC 
        LIMIT 1
        """)
    Map<String, Object> findTopCityBySales();

    @Query(value = """
         SELECT price_summary AS priceSummary, order_date AS orderDate 
        FROM report 
        WHERE order_date <= CURDATE() 
        ORDER BY order_date DESC 
        LIMIT 7
        """, nativeQuery = true)
    List<Map<String, Object>> find7DaysSales();

    @Query(value = """
        SELECT Count(*) 
        FROM report 
        """, nativeQuery = true)
    Integer countTheProducts();

    @Query(value = """
        SELECT SUM(price_summary) 
        FROM report 
        """, nativeQuery = true)
    Integer valueTotal();

    @Query(value = """
        SELECT 
        r1.year,
        r1.total_revenue,
        r2.total_revenue AS previous_revenue,
        ROUND(
            100.0 * (r1.total_revenue - r2.total_revenue) / NULLIF(r2.total_revenue, 0),
            2
            ) AS growth_rate
            FROM (
                SELECT 
                YEAR(order_date) AS year,
                SUM(price_summary) AS total_revenue
                FROM report
                GROUP BY YEAR(order_date)
                ) AS r1
                LEFT JOIN (
                    SELECT 
                    YEAR(order_date) AS year,
                    SUM(price_summary) AS total_revenue
                    FROM report
                    GROUP BY YEAR(order_date)
                    ) AS r2 ON r1.year = r2.year + 1
                    ORDER BY r1.year;
                    
        """, nativeQuery = true)
    List<Map<String, Object>> getGrowth();
}

