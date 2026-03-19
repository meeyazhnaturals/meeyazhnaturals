package com.meeyazh.naturals.controller;

import com.meeyazh.naturals.model.Order;
import com.meeyazh.naturals.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/orders")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @RequestBody Map<String, String> data) {
        String status = data.get("status");
        return orderService.updateOrderStatus(id, status)
                .map(order -> ResponseEntity.ok(Map.of("message", "Status updated successfully", "order", order)))
                .orElse(ResponseEntity.notFound().build());
    }
}
