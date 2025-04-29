package myapp.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}