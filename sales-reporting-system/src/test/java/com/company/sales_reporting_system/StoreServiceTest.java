package com.company.sales_reporting_system;

import com.company.sales_reporting_system.model.Store;
import com.company.sales_reporting_system.repository.StoreRepository;
import com.company.sales_reporting_system.service.StoreService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;


public class StoreServiceTest {

    @Mock
    private StoreRepository storeRepository;

    @InjectMocks
    private StoreService storeService;

    private Store store;

    @BeforeEach
    public void setUp() {
        store = new Store(1L, "Store 1", "North", 1000.0, "inactive");
    }

    @Test
    public void testUpdateStoreStatus() {
        when(storeRepository.findById(1L)).thenReturn(Optional.of(store));
        when(storeRepository.save(store)).thenReturn(store);

        Store updatedStore = storeService.updateStoreStatus(1L, "active");

        assertNotNull(updatedStore);
        assertEquals("active", updatedStore.getStatus());
    }

    @Test
    public void testGetAllStores() {
        // Thực hiện kiểm tra với repository giả lập
        when(storeRepository.findAll()).thenReturn(List.of(store));

        assertEquals(1, storeService.getAllStores().size());
    }
}
