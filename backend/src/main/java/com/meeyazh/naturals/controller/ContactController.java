package com.meeyazh.naturals.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping("/send")
    public ResponseEntity<Map<String, String>> sendContactEmail(@RequestBody Map<String, String> payload) {
        try {
            String name = payload.get("name");
            String email = payload.get("email");
            String subject = payload.get("subject");
            String message = payload.get("message");

            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo("meeyazhnaturals@gmail.com");
            mailMessage.setSubject("Contact Form: " + subject);
            mailMessage.setText(
                "New Contact Form Submission\n" +
                "===========================\n\n" +
                "Name: " + name + "\n" +
                "Email: " + email + "\n" +
                "Subject: " + subject + "\n\n" +
                "Message:\n" + message + "\n\n" +
                "---\n" +
                "Sent from Meeyazh Naturals Website"
            );
            mailMessage.setReplyTo(email);

            mailSender.send(mailMessage);

            return ResponseEntity.ok(Map.of("status", "success", "message", "Email sent successfully"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("status", "error", "message", "Failed to send email: " + e.getMessage()));
        }
    }
}
