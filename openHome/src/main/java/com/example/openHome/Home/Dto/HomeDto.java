package com.example.openHome.Home.Dto;

import com.example.openHome.Home.Home;

public class HomeDto {
    private Long id;
    private String address;
    private int rooms;
    private double price;
    private boolean availability;
    private String image;  // Base64 formatında
    private Long userId;

    public HomeDto() {
        // Default constructor needed for Jackson deserialization
    }

    public HomeDto(Home home) {
        this.id = home.getId();
        this.address = home.getAddress();
        this.rooms = home.getRooms();
        this.price = home.getPrice();
        this.availability = home.isAvailability();
        this.image = home.getImage() != null ? new String(home.getImage()) : null;
        this.userId = home.getUser().getId();
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getRooms() {
        return rooms;
    }

    public void setRooms(int rooms) {
        this.rooms = rooms;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public boolean isAvailability() {
        return availability;
    }

    public void setAvailability(boolean availability) {
        this.availability = availability;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}