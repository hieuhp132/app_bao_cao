import { useState } from "react";
import './Dropdown.css';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the dropdown open and closed
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button className="dropbtn" onClick={toggleDropdown}>
        Danh mục quản lý ▼
      </button>
      {isOpen && (
        <div className="dropdown-content">
          <div>Tổng quan</div>
          <div>Quản lý người dùng</div>
          <div>Quản lý nội dung</div>
          <div>Quản lý đơn hàng / giao dịch</div>
          <div>Quản lý sản phẩm / dịch vụ</div>
          <div>Quản lý phản hồi / hỗ trợ</div>
          <div>Thống kê và báo cáo</div>
          <div>Quản lý quyền và phân quyền</div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
