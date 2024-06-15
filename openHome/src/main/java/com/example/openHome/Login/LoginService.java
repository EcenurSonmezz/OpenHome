package com.example.openHome.Login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.openHome.Login.Dto.Credentials;
import com.example.openHome.Login.Dto.LoginResponse;
import com.example.openHome.Login.exception.LoginException;
import com.example.openHome.Users.User;
import com.example.openHome.Users.UserDto;
import com.example.openHome.Users.UserService;


@Service
public class LoginService {

    @Autowired
    UserService userService;

    public LoginResponse login(Credentials credentials) {
        // Giriş denemesi logu
        System.out.println("Login attempt for email: " + credentials.email());
        
        // Kullanıcıyı e-posta adresine göre bul
        User inDb = userService.findFirstByEmail(credentials.email());

        // Kullanıcı bulunamadıysa log ve hata fırlat
        if (inDb == null) {
            System.out.println("User not found for email: " + credentials.email());
            throw new LoginException("Kullanıcı bulunamadı");
        }
        
        // Şifre eşleşmiyorsa log ve hata fırlat
        if (!credentials.password().equals(inDb.getPassword())) {
            System.out.println("Invalid password for email: " + credentials.email());
            throw new LoginException("Şifre bilgisi hatalı");
        }

        // Kullanıcı bulundu ve şifre doğru ise giriş işlemini tamamla
        System.out.println("Login successful for email: " + credentials.email());
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setUserDto(new UserDto(inDb));
        return loginResponse;
    }
}
