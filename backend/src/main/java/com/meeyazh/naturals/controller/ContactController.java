package com.meeyazh.naturals.controller;

import com.meeyazh.naturals.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<Map<String, String>> sendContactEmail(@RequestBody Map<String, String> payload) {
        try {
            String name = payload.get("name");
            String email = payload.get("email");
            String subject = payload.get("subject");
            String message = payload.get("message");

            String body = String.format(
                "New Contact Form Submission\n" +
                "===========================\n\n" +
                "Name: %s\n" +
                "Email: %s\n" +
                "Subject: %s\n\n" +
                "Message:\n%s\n\n" +
                "---\n" +
                "Sent from Meeyazh Naturals Website",
                name, email, subject, message
            );

            emailService.sendOrderNotification("meeyazhnaturals@gmail.com", "Contact Form: " + subject, body);

            return ResponseEntity.ok(Map.of("status", "success", "message", "Email sent successfully"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("status", "error", "message", "Failed to send email: " + e.getMessage()));
        }
    }
}
