package com.meeyazh.naturals.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.Map;

@Service
public class VerificationEmailService {

    @Autowired
    private EmailService emailService;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Check every 10 minutes for users who just confirmed
    @Scheduled(fixedRate = 600000)
    public void sendWelcomeEmails() {
        String query = "SELECT id, email, full_name FROM profiles WHERE is_confirmed = true AND welcome_email_sent = false";
        List<Map<String, Object>> confirmedUsers = jdbcTemplate.queryForList(query);

        for (Map<String, Object> user : confirmedUsers) {
            String email = (String) user.get("email");
            String name = (String) user.get("full_name");
            
            if (email != null) {
                try {
                    sendEmail(email, "Welcome to Meeyazh Naturals!", 
                        "Hello " + (name != null ? name : "member") + ",\n\n" +
                        "Your account has been successfully confirmed. Welcome to the Meeyazh Naturals family!\n" +
                        "You can now explore our premium health mixes and start your journey to a healthier lifestyle.\n\n" +
                        "Visit us: http://meeyazhnaturals.in\n\n" +
                        "In good health,\n" +
                        "The Meeyazh Naturals Team");
                    
                    // Mark as sent
                    jdbcTemplate.update("UPDATE profiles SET welcome_email_sent = true WHERE id = ?", user.get("id"));
                } catch (Exception e) {
                    System.err.println("Failed to send welcome email to: " + email);
                }
            }
        }
    }

    // Check once a day for unconfirmed users older than 24 hours
    @Scheduled(cron = "0 0 10 * * *") // Every day at 10 AM
    public void sendConfirmationReminders() {
        // Query users created between 24 and 48 hours ago who are not confirmed
        String query = "SELECT id, email, full_name FROM profiles " +
                       "WHERE is_confirmed = false " +
                       "AND created_at < NOW() - INTERVAL '24 hours' " +
                       "AND created_at > NOW() - INTERVAL '48 hours'";
        
        List<Map<String, Object>> unconfirmedUsers = jdbcTemplate.queryForList(query);

        for (Map<String, Object> user : unconfirmedUsers) {
            String email = (String) user.get("email");
            if (email != null) {
                try {
                    sendEmail(email, "Reminder: Confirm your Meeyazh Naturals account", 
                        "Hello,\n\n" +
                        "We noticed you haven't confirmed your account yet. Please check your inbox for the confirmation link to activate your account and start shopping.\n\n" +
                        "If you need a new link, you can try signing in at: http://meeyazhnaturals.in/login\n\n" +
                        "In good health,\n" +
                        "The Meeyazh Naturals Team");
                } catch (Exception e) {
                    System.err.println("Failed to send reminder email to: " + email);
                }
            }
        }
    }

    private void sendEmail(String to, String subject, String body) {
        emailService.sendOrderNotification(to, subject, body);
    }
}
