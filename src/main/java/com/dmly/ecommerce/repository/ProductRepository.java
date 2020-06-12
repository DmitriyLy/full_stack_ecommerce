package com.dmly.ecommerce.repository;

import com.dmly.ecommerce.entiry.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
