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
import com.meeyazh.naturals.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*") // In production, replace with specific origins
public class PaymentController {

    private final String razorpayKeyId = "rzp_test_SR3XcyIKazNwaz";
    private final String razorpayKeySecret = "ilD0Fwn7a65GaBAZ4a6urCXp";

    @Autowired
    private EmailService emailService;

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> data) {
        try {
            // Safely get amount from Number to avoid ClassCastException (Double to int)
            Number amountNum = (Number) data.getOrDefault("amount", 0);
            int amount = amountNum.intValue();
            
            String customerName = (String) data.getOrDefault("name", "N/A");
            String customerEmail = (String) data.getOrDefault("email", "N/A");
            String customerPhone = (String) data.getOrDefault("phone", "N/A");
            String address = (String) data.getOrDefault("address", "N/A");
            String orderDetails = (String) data.getOrDefault("details", "N/A");
            
            System.out.println("Creating Razorpay Order for: " + customerName + " Amount: " + amount);
            
            RazorpayClient razorpay = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", amount * 100); // amount in the smallest currency unit
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "txn_" + UUID.randomUUID().toString().substring(0, 8));
            orderRequest.put("payment_capture", true);
            
            // Adding technical notes for the owner to see in Razorpay Dashboard
            JSONObject notes = new JSONObject();
            notes.put("customer_name", customerName);
            notes.put("customer_email", customerEmail);
            notes.put("customer_phone", customerPhone);
            notes.put("shipping_address", address);
            notes.put("order_items", orderDetails);
            orderRequest.put("notes", notes);
            
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

    @PostMapping("/notify-order")
    public ResponseEntity<?> notifyOrder(@RequestBody Map<String, Object> data) {
        try {
            System.out.println("Received order notification request for: " + data.get("name"));
            String name = (String) data.getOrDefault("name", "N/A");
            String email = (String) data.getOrDefault("email", "N/A");
            String phone = (String) data.getOrDefault("phone", "N/A");
            String address = (String) data.getOrDefault("address", "N/A");
            String items = (String) data.getOrDefault("items", "N/A");
            String total = String.valueOf(data.getOrDefault("total", "0"));

            System.out.println("Attempting to send email alert to meeyazhnaturals@gmail.com...");
            
            String subject = "New Order Received from " + name;
            String body = "Hey Meeyazhnaturals you have an order please process it quickly.\n\n" +
                         "--- Customer Details ---\n" +
                         "Name: " + name + "\n" +
                         "Email: " + email + "\n" +
                         "Phone: " + phone + "\n\n" +
                         "--- Shipping Address ---\n" +
                         address + "\n\n" +
                         "--- Order Details ---\n" +
                         items + "\n\n" +
                         "Total Amount Paid: ₹" + total + "\n\n" +
                         "Please visit your admin panel for more details.";

            emailService.sendOrderNotification("meeyazhnaturals@gmail.com", subject, body);
            return ResponseEntity.ok(Map.of("message", "Notification sent successfully"));
        } catch (Exception e) {
            System.err.println("Fatal error in notify-order endpoint: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Failed to send notification: " + e.getMessage()));
        }
    }
}
