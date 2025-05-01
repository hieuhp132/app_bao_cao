package myapp.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import myapp.model.Report;
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

    public List<Map<String, Object>> get7Days(){
        List<Map<String, Object>> result  = reportRepo.find7DaysSales();
        if(result  == null || result.isEmpty()){
             Map<String, Object> noData = new HashMap<>();
            noData.put("message", "No data");
            return List.of(noData);
        }

        return result ;
    }


    public int countProducts(){
        int res = reportRepo.countTheProducts();
        if(res == 0){
            return 0;
        }
        return res;
    }

    public int valueTotal(){
        int res = reportRepo.valueTotal();
        if(res == 0){
            return 0;
        }
        return res;
    }

    public List<Map<String, Object>> getGrowth(){
        List<Map<String, Object>> result  = reportRepo.getGrowth();
        if(result  == null || result.isEmpty()){
             Map<String, Object> noData = new HashMap<>();
            noData.put("message", "No data");
            return List.of(noData);
        }

        return result ;
    }

    public Report createReport(String orderDate, String productCode, String productName, String category, 
    int quantity, double price, double priceSummary, String city){
        Report report = new Report(orderDate, productCode,productName, category, quantity,price,priceSummary, city);
        return reportRepo.save(report);
    }
}
