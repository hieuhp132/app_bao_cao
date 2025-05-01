package myapp.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import myapp.model.Product;
import myapp.model.Report;
import myapp.service.ReportService;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/overview")
public class WebController {
    private final ReportService reportService;

    public WebController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/top-city")
    public ResponseEntity<String[]> getTopCity() {
        return ResponseEntity.ok(reportService.getTopCityBySales());
    }

    @GetMapping("/7-days")
    public ResponseEntity<List<Map<String, Object>>> get7DaysSales() {
        return ResponseEntity.ok(reportService.get7Days());
    }


    @GetMapping("/count-the-products")
    public ResponseEntity<Integer> countTheProducts() {
        return ResponseEntity.ok(reportService.countProducts());
    }

    @GetMapping("/value-all-products")
    public ResponseEntity<Integer> valueTotal() {
        return ResponseEntity.ok(reportService.valueTotal());
    }

    @GetMapping("/growth")
    public ResponseEntity<List<Map<String, Object>>> getGrowth() {
        return ResponseEntity.ok(reportService.getGrowth());
    }

    @PostMapping("/create")
        public ResponseEntity<Report> reportCreate(@RequestBody Report report) {
            Report saved = reportService.createReport(
                report.getOrderDate(),
                report.getProductCode(),
                report.getProductName(),
                report.getCategory(),
                report.getQuantity(),
                report.getPrice(),
                report.getPriceSummary(),
                report.getCity()
        );
        return ResponseEntity.ok(saved);
    }
}