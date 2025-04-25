package myapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import myapp.model.Order;
import myapp.repository.OrderRepository;

@Service
public class OrderService {

    private final OrderRepository orderRepo;
    @Autowired
    public OrderService(OrderRepository orderRepo) {
        this.orderRepo = orderRepo;
    }

    public Order createOrder(String orderCode, String orderCustomerName, String orderDate, String orderPrice, String orderStatus){
        Order order = new Order(orderCode, orderCustomerName,orderDate, orderPrice, orderStatus);
        return orderRepo.save(order);
    }

    public List<Order> getAllOrder() {
        return orderRepo.findAll();
    }

    public boolean deleteOrder(Long id) {
        if (orderRepo.existsById(id)) {
            orderRepo.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    public Order updateOrder(Long id, Order order) {
        Optional<Order> existingOrder = orderRepo.findById(id);
        if (existingOrder.isPresent()) {
            Order response = existingOrder.get();
            response.setOrderCode(order.getOrderCode());
            response.setOrderCustomerName(order.getOrderCustomerName());
            response.setOrderDate(order.getOrderDate());
            response.setOrderPrice(order.getOrderPrice());
            response.setOrderStatus(order.getOrderStatus());
            return orderRepo.save(response);  // Cập nhật và lưu lại
        }
        return null;  // Trả về null nếu không tìm thấy đơn hàng
    }
}
