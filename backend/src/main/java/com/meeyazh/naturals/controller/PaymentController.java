package com.meeyazh.naturals.controller;

import com.meeyazh.naturals.model.Order;
import com.meeyazh.naturals.service.OrderService;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*")
public class PaymentController {

    private final String razorpayKeyId = "rzp_test_SR3XcyIKazNwaz";
    private final String razorpayKeySecret = "ilD0Fwn7a65GaBAZ4a6urCXp";

    @Autowired
    private OrderService orderService;

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> data) {
        try {
            Number amountNum = (Number) data.getOrDefault("amount", 0);
            int amount = amountNum.intValue();
            
            RazorpayClient razorpay = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", amount * 100); 
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "txn_" + UUID.randomUUID().toString().substring(0, 8));
            
            com.razorpay.Order order = razorpay.orders.create(orderRequest);
            
            Map<String, Object> response = new HashMap<>();
            response.put("id", order.get("id"));
            response.put("amount", order.get("amount"));
            response.put("currency", order.get("currency"));
            response.put("key", razorpayKeyId);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @SuppressWarnings("unchecked")
    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, Object> data) {
        try {
            String razorpayOrderId = (String) data.get("razorpay_order_id");
            String razorpayPaymentId = (String) data.get("razorpay_payment_id");
            String razorpaySignature = (String) data.get("razorpay_signature");
            
            // Verify signature
            JSONObject options = new JSONObject();
            options.put("razorpay_order_id", razorpayOrderId);
            options.put("razorpay_payment_id", razorpayPaymentId);
            options.put("razorpay_signature", razorpaySignature);

            boolean isValid = Utils.verifyPaymentSignature(options, razorpayKeySecret);

            if (isValid) {
                // Payment is valid, now create the order in database
                Map<String, Object> orderDetails = (Map<String, Object>) data.get("order_details");
                
                Order order = Order.builder()
                        .customerName((String) orderDetails.get("customer_name"))
                        .email((String) orderDetails.get("email"))
                        .phone((String) orderDetails.get("phone"))
                        .address((String) orderDetails.get("address"))
                        .items((String) orderDetails.get("items"))
                        .totalAmount(Double.valueOf(String.valueOf(orderDetails.get("total_amount"))))
                        .paymentId(razorpayPaymentId)
                        .razorpayOrderId(razorpayOrderId)
                        .orderStatus("PLACED")
                        .build();

                Order savedOrder = orderService.saveOrder(order);
                return ResponseEntity.ok(Map.of("status", "success", "order_id", savedOrder.getId()));
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("status", "failure", "message", "Invalid signature"));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
}
