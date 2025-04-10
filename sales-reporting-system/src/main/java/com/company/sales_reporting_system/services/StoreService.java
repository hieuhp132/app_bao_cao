package com.company.sales_reporting_system.service;

import com.company.sales_reporting_system.model.Store;
import com.company.sales_reporting_system.repository.StoreRepository;
import com.company.sales_reporting_system.exceptions.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StoreService {

    @Autowired
    private StoreRepository storeRepository;

   public List<Store> getAllStores() {
        return storeRepository.findAll();
    }

    public Store updateStoreStatus(Long id, String status) {
        Store store = storeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Store not found"));
        store.setStatus(status);
        return storeRepository.save(store);
    }
}

