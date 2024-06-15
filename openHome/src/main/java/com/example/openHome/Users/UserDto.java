package com.example.openHome.Users;

public class UserDto {
    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private String role;

    
    public UserDto(User user) {
        setId(user.getId());
        setEmail(user.getEmail());
        setFullName(user.getFullName());
        setPhone(user.getPhone());
        setAddress(user.getAddress());
        setRole(user.getRole());
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getFullName() {
        return fullName;
    }
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
}
