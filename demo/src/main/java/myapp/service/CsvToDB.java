package myapp.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvException;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import myapp.model.Report;
import myapp.repository.ReportRepository;
@Service
@RequiredArgsConstructor
public class CsvToDB {
    private final ReportRepository rpRepo;

    @PostConstruct // Tự động chạy khi ứng dụng khởi động
    public void importCsv() {
        if (rpRepo.count() == 0) { // Chỉ import nếu bảng trống
            // Đọc CSV và lưu vào DB
            try {
                ClassPathResource resource = new ClassPathResource("sales_data_sample.csv");
                InputStream inputStream = resource.getInputStream();
                List<Report> rp = parseCsv(inputStream);
                rpRepo.saveAll(rp);
                System.out.println("Đã import thành công " + rp.size() + " users");
            } catch (IOException e) {
                System.err.println("Lỗi khi đọc file CSV: " + e.getMessage());
            }
        }
    }
    
    private List<Report> parseCsv(InputStream inputStream) throws IOException {
      try {
        // Sử dụng try-with-resources và handle CsvException
        CSVReader reader = new CSVReaderBuilder(new InputStreamReader(inputStream, StandardCharsets.UTF_8))
            .withSkipLines(1) // skip first row
            .build();

        return reader.readAll().stream()
            .map(data -> {
                try {
                    if (data.length < 9) {
                        throw new IllegalArgumentException("Thiếu cột dữ liệu");
                    }
                    
                    return new Report(
                        data[0].trim(),
                        Double.parseDouble(data[1]),
                        Double.parseDouble(data[2]),
                        data[3].trim(),
                        data[4].trim(),
                        data[5].trim(),
                        Integer.parseInt(data[6]),
                        data[7].trim(),
                        data[8].trim()
                    );
                } catch (Exception e) {
                    System.err.println("Lỗi xử lý dòng: " + String.join(",", data));
                    return null;
                }
            })
            .filter(Objects::nonNull)
            .collect(Collectors.toList());

    } catch (CsvException e) {
        // Xử lý lỗi parse CSV tổng
        throw new IOException("Lỗi định dạng CSV: " + e.getMessage(), e);
    }
    }
    
}
