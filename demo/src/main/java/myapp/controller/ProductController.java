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
import myapp.model.Product;
import myapp.service.ProductService;
@RestController
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/products/create")
    public ResponseEntity<Product> productCreate(@RequestBody Product product) {
        Product saved = productService.createProduct(
            product.getProductName(),
            product.getProductDescription(),
            product.getProductPrice(),
            product.getProductCategory(),
            product.getQuantityStock(),
            product.getProductImage()
        );
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<String> deleteProducts(@PathVariable Long id) {
        boolean deleted = productService.deleteProduct(id);
        if (deleted) {
            return ResponseEntity.ok("Product deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/products/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        // Cập nhật đơn hàng theo id
        Product updatedProduct = productService.updateProduct(id, product);
        if (updatedProduct != null) {
            return ResponseEntity.ok(updatedProduct);  // Trả về đơn hàng đã được cập nhật
        } else {
            return ResponseEntity.notFound().build();  // Nếu không tìm thấy đơn hàng
        }
    }
}   
