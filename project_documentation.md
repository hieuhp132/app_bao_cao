# Ứng Dụng Báo Cáo Doanh Số Cho Chuỗi Cửa Hàng

## Tổng Quan
Ứng dụng bảng điều khiển dành cho chuỗi cửa hàng bán lẻ để theo dõi hiệu suất bán hàng hàng ngày và hàng tuần trên nhiều cửa hàng. Ứng dụng cung cấp các chỉ báo trực quan về xu hướng hiệu suất và thông điệp phản hồi tự động.

## Tính Năng Chính

### 1. Theo Dõi Hiệu Suất Hàng Ngày
- Chỉ báo trạng thái được mã hóa màu:
  - Xanh lá: Doanh số tăng
  - Đen: Doanh số không thay đổi
  - Đỏ: Doanh số giảm
  - Biểu tượng trái tim: Đạt mục tiêu
- Hiển thị giá trị hiện tại, giá trị trước đó và mục tiêu cho mỗi cửa hàng

### 2. Phân Tích Hiệu Suất Hàng Tuần
- So sánh với hiệu suất tuần trước
- Tính toán phần trăm thay đổi
- Thông điệp phản hồi tự động:
  - Thông điệp chúc mừng cho tăng trưởng
  - Thông điệp động viên cho suy giảm

### 3. Trực Quan Hóa Dữ Liệu
- Biểu đồ cột so sánh hàng ngày
- Biểu đồ đường xu hướng hàng tuần
- Biểu đồ tổng quan hiệu suất hiển thị phần trăm đạt mục tiêu

### 4. Báo Cáo Phân Cấp
- Tổng số công ty cho quản lý cấp cao
- Tổng số hệ thống cho quản lý điều hành
- Tổng số cửa hàng theo khu vực cho quản lý vùng

## Triển Khai Kỹ Thuật

### Frontend
- React với TypeScript
- Material-UI cho thiết kế đáp ứng
- Recharts cho trực quan hóa dữ liệu
- Hiện đang sử dụng dữ liệu mẫu (10 cửa hàng)

### Cấu Trúc Dữ Liệu
```typescript
// Dữ liệu báo cáo hàng ngày
{
  storeName: string;
  currentValue: number;
  previousValue: number;
  target: number;
}

// Dữ liệu báo cáo hàng tuần
{
  storeName: string;
  currentWeekValue: number;
  previousWeekValue: number;
  target: number;
}
```

## Cách Sử Dụng

1. **Xem Báo Cáo Hàng Ngày**
   - Điều hướng đến tab "Báo cáo ngày"
   - Xem các chỉ báo được mã hóa màu cho mỗi cửa hàng
   - So sánh giá trị hiện tại với mục tiêu

2. **Xem Báo Cáo Hàng Tuần**
   - Điều hướng đến tab "Báo cáo tuần"
   - Xem phần trăm thay đổi so với tuần trước
   - Đọc thông điệp phản hồi về hiệu suất

3. **Phân Tích Biểu Đồ Hiệu Suất**
   - Xem biểu đồ cột cho so sánh hàng ngày
   - Xem biểu đồ đường cho xu hướng hàng tuần
   - Xem tổng quan hiệu suất hiển thị phần trăm đạt mục tiêu

## Cải Tiến Trong Tương Lai
- Tích hợp API để thay thế dữ liệu mẫu
- Kiểm soát truy cập dựa trên vai trò
- Lập lịch tự động cho cập nhật
- Thêm các loại trực quan hóa
- Nhóm cửa hàng theo khu vực 