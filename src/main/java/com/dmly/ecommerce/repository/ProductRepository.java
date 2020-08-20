package com.dmly.ecommerce.repository;

import com.dmly.ecommerce.entiry.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
public interface ProductRepository extends JpaRepository<Product, Long> {
}
