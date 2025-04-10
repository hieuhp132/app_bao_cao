package com.company.sales_reporting_system;

import com.company.sales_reporting_system.controller.StoreController;
import com.company.sales_reporting_system.model.Store;
import com.company.sales_reporting_system.service.StoreService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;


public class StoreControllerTest {

    @Mock
    private StoreService storeService;

    @InjectMocks
    private StoreController storeController;

    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(storeController).build();
    }

    @Test
    public void testGetStores() throws Exception {
        // Giả lập hành vi của storeService
        when(storeService.getAllStores()).thenReturn(List.of(new Store(1L, "Store 1", "North", 1000.0, "active")));

        mockMvc.perform(get("/api/stores"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].name").value("Store 1"))
                .andExpect(jsonPath("$[0].status").value("active"));
    }

    @Test
    public void testUpdateStoreStatus() throws Exception {
        // Giả lập hành vi của storeService
        Store store = new Store(1L, "Store 1", "North", 1000.0, "inactive");
        when(storeService.updateStoreStatus(1L, "active")).thenReturn(store);

        mockMvc.perform(put("/api/stores/1/status")
                        .contentType("application/json")
                        .content("{\"status\":\"active\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("active"));
    }
}



