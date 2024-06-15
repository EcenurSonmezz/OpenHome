package com.example.openHome.Users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signUpUser(@RequestBody User user) {
        try {
            userService.createUser(user);
            return ResponseEntity.ok("New user created successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

        // Kullanıcı bilgilerini döndüren yeni GET endpoint
        @GetMapping("/current")
        public ResponseEntity<UserDto> getCurrentUser(@RequestParam String email) {
            User user = userService.findFirstByEmail(email);
            if (user != null) {
                return ResponseEntity.ok(new UserDto(user));
            } else {
                return ResponseEntity.notFound().build();
            }
        }

}
