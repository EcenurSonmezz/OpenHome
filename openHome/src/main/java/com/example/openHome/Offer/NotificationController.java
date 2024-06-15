package com.example.openHome.Offer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Notification>> getNotificationsByUserId(@PathVariable Long userId) {
        List<Notification> notifications = notificationService.getNotificationsByUserId(userId);
        return ResponseEntity.ok(notifications);
    }

    @PutMapping("/user/{userId}/mark-all-read")
    public ResponseEntity<Void> markAllAsRead(@PathVariable Long userId) {
        notificationService.markAllAsRead(userId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/offer/{offerId}/accept")
    public ResponseEntity<Void> acceptOffer(@PathVariable Long offerId) {
        try {
            notificationService.acceptOffer(offerId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping("/offer/{offerId}/reject")
    public ResponseEntity<Void> rejectOffer(@PathVariable Long offerId) {
        try {
            notificationService.rejectOffer(offerId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping
    public ResponseEntity<Void> createNotification(@RequestBody Notification notification) {
        notificationService.sendNotification(notification.getUserId(), notification.getMessage(), notification.getOfferId());
        return ResponseEntity.noContent().build();
    }
}
