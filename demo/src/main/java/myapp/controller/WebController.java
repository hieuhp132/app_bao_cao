package myapp.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import myapp.service.ReportService;

@Controller
public class WebController {
    private final ReportService reportService;

    public WebController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/top-city")
    @CrossOrigin(origins = "http://localhost:8082/top-city")
    public ResponseEntity<String[]> getTopCity() {
        return ResponseEntity.ok(reportService.getTopCityBySales());
    }

    @GetMapping("/7-days")
    @CrossOrigin(origins = "http://localhost:8082/7-days")
    public ResponseEntity<List<Map<String, Object>>> get7DaysSales() {
        return ResponseEntity.ok(reportService.get7Days());
    }

    
}