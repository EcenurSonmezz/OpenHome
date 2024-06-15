package com.example.openHome.Login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.openHome.Login.Dto.Credentials;
import com.example.openHome.Login.Dto.LoginResponse;

import jakarta.validation.Valid;


@RestController
public class LoginController {


    @Autowired
    LoginService loginService;

    @PostMapping("/api/v1/login")
    LoginResponse handleLogin(@Valid @RequestBody Credentials creds) {
        return loginService.login(creds);
    }


}
