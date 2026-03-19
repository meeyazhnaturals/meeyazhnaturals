package com.meeyazh.naturals.service;

import com.meeyazh.naturals.model.Order;
import com.meeyazh.naturals.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private EmailService emailService;

    public Order saveOrder(Order order) {
        Order savedOrder = orderRepository.save(order);
        sendNewOrderEmails(savedOrder);
        return savedOrder;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<Order> getCustomerOrders(String email) {
        return orderRepository.findByEmail(email);
    }

    public Optional<Order> updateOrderStatus(Long orderId, String newStatus) {
        return orderRepository.findById(orderId).map(order -> {
            order.setOrderStatus(newStatus);
            Order updatedOrder = orderRepository.save(order);
            sendStatusUpdateEmail(updatedOrder);
            return updatedOrder;
        });
    }

    private void sendNewOrderEmails(Order order) {
        // To Admin
        String adminBody = String.format("""
            Hey Meeyazhnaturals, you have a new order!
            
            Order details:
            Order ID: %d
            Razorpay Order ID: %s
            Payment ID: %s
            Customer: %s (%s)
            Phone: %s
            Shipping Address: %s
            Items: %s
            Total Amount: ₹%.2f
            
            Please process it quickly.
            """,
            order.getId(), order.getRazorpayOrderId(), order.getPaymentId(), 
            order.getCustomerName(), order.getEmail(), order.getPhone(), 
            order.getAddress(), order.getItems(), order.getTotalAmount()
        );
        emailService.sendOrderNotification("meeyazhnaturals@gmail.com", "New Order Received - " + order.getId(), adminBody);

        // To Customer
        String customerBody = String.format("""
            Hello %s,
            
            Thank you for ordering with Meeyazh Naturals! Your order has been placed successfully.
            
            Order Summary:
            Order ID: %d
            Items: %s
            Total Amount: ₹%.2f
            Payment ID: %s
            Delivery Address: %s
            
            Current Status: %s
            
            We will notify you once your order is shipped.
            """,
            order.getCustomerName(), order.getId(), order.getItems(), 
            order.getTotalAmount(), order.getPaymentId(), order.getAddress(), order.getOrderStatus()
        );
        emailService.sendOrderNotification(order.getEmail(), "Order Confirmation - Meeyazh Naturals", customerBody);
    }

    private void sendStatusUpdateEmail(Order order) {
        String body = String.format("""
            Hello %s,
            
            Great news! Your order status has been updated.
            
            Order ID: %d
            New Status: %s
            
            %s
            
            Thank you for choosing Meeyazh Naturals!
            """,
            order.getCustomerName(), order.getId(), order.getOrderStatus(),
            order.getOrderStatus().equalsIgnoreCase("SHIPPED") ? "Your order is on its way!" : ""
        );
        String subject = "Your Order Update from Meeyazh Naturals - " + order.getOrderStatus();
        emailService.sendOrderNotification(order.getEmail(), subject, body);
    }
}
