package com.meeyazh.naturals.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.Map;
import java.util.HashMap;
import java.util.UUID;
import com.razorpay.RazorpayClient;
import com.razorpay.Order;
import org.json.JSONObject;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*") // In production, replace with specific origins
public class PaymentController {

    private final String razorpayKeyId = "rzp_test_SR3XcyIKazNwaz";
    private final String razorpayKeySecret = "ilD0Fwn7a65GaBAZ4a6urCXp";

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> data) {
        try {
            int amount = (int) data.get("amount");
            
            RazorpayClient razorpay = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", amount * 100); // amount in the smallest currency unit
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "txn_" + UUID.randomUUID().toString().substring(0, 8));
            orderRequest.put("payment_capture", true);
            
            Order order = razorpay.orders.create(orderRequest);
            
            Map<String, Object> response = new HashMap<>();
            response.put("id", order.get("id"));
            response.put("amount", order.get("amount"));
            response.put("currency", order.get("currency"));
            response.put("status", order.get("status"));
            response.put("key", razorpayKeyId);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
}
