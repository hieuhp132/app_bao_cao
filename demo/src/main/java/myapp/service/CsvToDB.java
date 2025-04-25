package myapp.service;

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
                ClassPathResource resource = new ClassPathResource("doanh_thu_mau.csv");
                InputStream inputStream = resource.getInputStream();
                List<Report> rp = parseCsv(inputStream);
                rpRepo.saveAll(rp);
                System.out.println("Đã import thành công " + rp.size() + " bản ghi");
            } catch (IOException e) {
                System.err.println("Lỗi khi đọc file CSV: " + e.getMessage());
            }
        }
    }

    private List<Report> parseCsv(InputStream inputStream) throws IOException {
        try (CSVReader reader = new CSVReaderBuilder(new InputStreamReader(inputStream, StandardCharsets.UTF_8))
                .withSkipLines(1) // Bỏ qua dòng đầu tiên (chứa tiêu đề)
                .build()) {

            return reader.readAll().stream()
                .map(this::mapToReport) // Chuyển đổi mỗi dòng thành đối tượng Report
                .filter(Objects::nonNull) // Loại bỏ những dòng có lỗi
                .collect(Collectors.toList());
        } catch (CsvException e) {
            throw new IOException("Lỗi định dạng CSV: " + e.getMessage(), e);
        }
    }

    // Tách logic ra ngoài để dễ kiểm tra và bảo trì
    private Report mapToReport(String[] data) {
        try {
            if (data.length < 8) {
                throw new IllegalArgumentException("Dữ liệu thiếu cột: " + String.join(",", data));
            }
            return new Report(
        cleanString(data[0].trim()),  // orderDate
        cleanString(data[1].trim()),  // productCode
        cleanString(data[2].trim()),  // productName
        cleanString(data[3].trim()),  // category
        parseInteger(data[4].trim()), // quantity
        parseDouble(data[5].trim()),  // price
        parseDouble(data[6].trim()),  // priceSummary
        cleanString(data[7].trim())  // city
);
        } catch (Exception e) {
            System.err.println("Lỗi xử lý dòng: " + String.join(",", data) + " - " + e.getMessage());
            return null;  // Trả về null nếu có lỗi
        }
    }
    private String cleanString(String input) {
        if (input == null) {
            return null;
        }
        return input.replaceAll("[^\\x00-\\x7F]", ""); // Loại bỏ ký tự không hợp lệ (non-ASCII)
    }
    // Phương thức hỗ trợ để parse Integer
    private Integer parseInteger(String value) {
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException e) {
            System.err.println("Không thể chuyển đổi sang số nguyên: " + value);
            return 0;  // Trả về 0 nếu có lỗi
        }
    }

    // Phương thức hỗ trợ để parse Double
    private Double parseDouble(String value) {
        try {
            return Double.parseDouble(value);
        } catch (NumberFormatException e) {
            System.err.println("Không thể chuyển đổi sang số thực: " + value);
            return 0.0;  // Trả về 0 nếu có lỗi
        }
    }
}
