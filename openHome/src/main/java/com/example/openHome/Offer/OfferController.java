package com.example.openHome.Offer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/offers")
public class OfferController {
    @Autowired
    private OfferService offerService;

    @PostMapping
    public ResponseEntity<Offer> createOffer(@RequestBody Offer offer) {
        Offer newOffer = offerService.saveOffer(offer);
        return ResponseEntity.ok(newOffer);
    }

    @GetMapping("/home/{homeId}")
    public ResponseEntity<List<Offer>> getOffersByHomeId(@PathVariable Long homeId) {
        List<Offer> offers = offerService.getOffersByHomeId(homeId);
        return ResponseEntity.ok(offers);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Offer>> getOffersByUserId(@PathVariable Long userId) {
        List<Offer> offers = offerService.getOffersByUserId(userId);
        return ResponseEntity.ok(offers);
    }

    @GetMapping("/{offerId}")
    public ResponseEntity<Offer> getOfferById(@PathVariable Long offerId) {
        Offer offer = offerService.getOfferById(offerId);
        return ResponseEntity.ok(offer);
    }
}
