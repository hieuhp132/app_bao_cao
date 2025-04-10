package com.company.sales_reporting_system.controller;

import org.springframework.http.HttpStatus;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ErrorController {

    // Xử lý lỗi 404 Not Found
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleError(Exception e, Model model) {
        model.addAttribute("error", "404 - Page Not Found");
        return "error";  // Chuyển tới trang lỗi
    }
}
