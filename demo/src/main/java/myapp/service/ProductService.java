package myapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import myapp.model.Product;
import myapp.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository productRepo;
    @Autowired
    public ProductService(ProductRepository productRepo) {
        this.productRepo = productRepo;
    }

    public Product createProduct(String name, String description, double price, String category, int stock, String img){
        Product product = new Product(name, description,price, category, stock,img);
        return productRepo.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    public boolean deleteProduct(Long id) {
        if (productRepo.existsById(id)) {
            productRepo.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    public Product updateProduct(Long id, Product product) {
        Optional<Product> existingProduct = productRepo.findById(id);
        if (existingProduct.isPresent()) {
            Product response = existingProduct.get();
            response.setProductName(product.getProductName());
            response.setProductDescription(product.getProductDescription());
            response.setProductPrice(product.getProductPrice());
            response.setProductCategory(product.getProductCategory());
            response.setQuantityStock(product.getQuantityStock());
            response.setProductImage(product.getProductImage());
            return productRepo.save(response);  // Cập nhật và lưu lại
        }
        return null;  // Trả về null nếu không tìm thấy đơn hàng
    }
}
