package myapp.service;

import java.util.Map;

import org.springframework.stereotype.Service;

import myapp.repository.ReportRepository;

@Service
public class ReportService {
    private final ReportRepository reportRepo;

    public ReportService(ReportRepository reportRepo) {
        this.reportRepo = reportRepo;
    }

    public String[] getTopCityBySales() {
        Map<String, Object> result = reportRepo.findTopCityBySales();
        if (result == null || result.isEmpty()) {
            return new String[]{"No data", "0"}; // Giá trị mặc định
        }
        return new String[]{
            result.get("city").toString(),
            result.get("totalSales").toString()
        };
    }
}
