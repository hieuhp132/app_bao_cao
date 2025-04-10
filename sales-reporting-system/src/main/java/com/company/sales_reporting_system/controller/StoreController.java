package com.company.sales_reporting_system.controller;

import com.company.sales_reporting_system.model.Store;
import com.company.sales_reporting_system.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.ArrayList;

@RestController
public class StoreController {

    @Autowired
    private StoreRepository storeRepository;

    @GetMapping("/api/stores")
    public List<Store> getStores() {
        return storeRepository.findAll();
    }
}
