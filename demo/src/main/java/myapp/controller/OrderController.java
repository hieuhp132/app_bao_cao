package myapp.controller;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import myapp.model.Order;
import myapp.service.OrderService;
@RestController
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/orders/create")
    public ResponseEntity<Order> productCreate(@RequestBody Order order) {
        Order saved = orderService.createOrder(
            order.getOrderCode(),
            order.getOrderCustomerName(),
            order.getOrderDate(),
            order.getOrderPrice(),
            order.getOrderStatus()
        );
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrder());
    }

    @DeleteMapping("/orders/{id}")
    public ResponseEntity<String> deleteProducts(@PathVariable Long id) {
        boolean deleted = orderService.deleteOrder(id);
        if (deleted) {
            return ResponseEntity.ok("Order deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/orders/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order order) {
        // Cập nhật đơn hàng theo id
        Order updatedOrder = orderService.updateOrder(id, order);
        if (updatedOrder != null) {
            return ResponseEntity.ok(updatedOrder);  // Trả về đơn hàng đã được cập nhật
        } else {
            return ResponseEntity.notFound().build();  // Nếu không tìm thấy đơn hàng
        }
    }
}   
