package com.example.openHome.Offer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OfferService {
    @Autowired
    private OfferRepository offerRepository;

    @Autowired
    private NotificationService notificationService;

    public Offer saveOffer(Offer offer) {
        Offer newOffer = offerRepository.save(offer);
        notificationService.sendNotification(newOffer.getUserId(), "Yeni bir teklif aldınız: " + newOffer.getMessage(), newOffer.getId());
        return newOffer;
    }

    public List<Offer> getOffersByHomeId(Long homeId) {
        return offerRepository.findByHomeId(homeId);
    }

    public List<Offer> getOffersByUserId(Long userId) {
        return offerRepository.findByUserId(userId);
    }

    public Offer getOfferById(Long offerId) {
        return offerRepository.findById(offerId).orElse(null);
    }
}
