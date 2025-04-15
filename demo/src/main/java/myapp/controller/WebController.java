package myapp.controller;

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
    @CrossOrigin(origins = "http://localhost:8081/top-city")
    public ResponseEntity<String[]> getTopCity() {
        return ResponseEntity.ok(reportService.getTopCityBySales());
    }
}