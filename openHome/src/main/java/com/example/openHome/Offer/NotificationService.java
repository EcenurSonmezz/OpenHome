package com.example.openHome.Offer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private OfferRepository offerRepository;

    public void sendNotification(Long userId, String message, Long offerId) {
        Notification notification = new Notification();
        notification.setUserId(userId);
        notification.setMessage(message);
        notification.setRead(false);
        notification.setOfferId(offerId);
        notificationRepository.save(notification);
    }

    public List<Notification> getNotificationsByUserId(Long userId) {
        return notificationRepository.findByUserId(userId);
    }

    public void markAllAsRead(Long userId) {
        List<Notification> notifications = notificationRepository.findByUserId(userId);
        for (Notification notification : notifications) {
            notification.setRead(true);
        }
        notificationRepository.saveAll(notifications);
    }

    public void acceptOffer(Long offerId) {
        Offer offer = offerRepository.findById(offerId).orElseThrow(() -> new RuntimeException("Offer not found"));
        offer.setStatus("Accepted");
        offerRepository.save(offer);

        Notification notification = notificationRepository.findByOfferId(offerId);
        if (notification != null) {
            notification.setRead(true);
            notificationRepository.save(notification);
        } else {
            throw new RuntimeException("Notification not found for offerId: " + offerId);
        }
    }

    public void rejectOffer(Long offerId) {
        Offer offer = offerRepository.findById(offerId).orElseThrow(() -> new RuntimeException("Offer not found"));
        offer.setStatus("Rejected");
        offerRepository.save(offer);

        Notification notification = notificationRepository.findByOfferId(offerId);
        if (notification != null) {
            notification.setRead(true);
            notificationRepository.save(notification);
        } else {
            throw new RuntimeException("Notification not found for offerId: " + offerId);
        }
    }
}
