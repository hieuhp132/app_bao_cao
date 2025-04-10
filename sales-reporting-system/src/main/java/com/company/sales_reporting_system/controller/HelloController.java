package com.company.sales_reporting_system.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    // Endpoint gốc /, sẽ trả về một thông điệp khi truy cập vào localhost:8080/
    @GetMapping("/")
    public String home() {
        return "✅ Spring Boot backend is running!";
    }

    // Endpoint thử nghiệm API, truy cập vào localhost:8080/api/test
    @GetMapping("/api/test")
    public String apiTest() {
        return "✅ API test successful!";
    }
}
