package com.example.openHome.Login.Dto;

import com.example.openHome.Users.UserDto;

public class LoginResponse {
    UserDto user;

    public UserDto getUserDto() {
        return user;
    }

    public void setUserDto(UserDto user) {
        this.user = user;
    }
}
