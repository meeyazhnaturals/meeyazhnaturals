package com.meeyazh.naturals.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@Service
public class EmailService {

    @Value("${brevo.api.key}")
    private String brevoApiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final String BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

    public void sendOrderNotification(String to, String subject, String body) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("api-key", brevoApiKey);

            Map<String, Object> request = new HashMap<>();
            request.put("sender", Map.of("name", "Meeyazh Naturals", "email", "meeyazhnaturals@gmail.com"));
            request.put("to", List.of(Map.of("email", to)));
            request.put("subject", subject);
            request.put("textContent", body);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);
            
            ResponseEntity<String> response = restTemplate.postForEntity(BREVO_API_URL, entity, String.class);
            
            if (response.getStatusCode().is2xxSuccessful()) {
                System.out.println("Order notification email sent successfully via Brevo to " + to);
            } else {
                System.err.println("Failed to send email via Brevo. Status: " + response.getStatusCode());
            }
        } catch (Exception e) {
            System.err.println("Error sending email via Brevo API: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
