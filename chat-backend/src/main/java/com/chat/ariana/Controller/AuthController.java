package com.chat.ariana.Controller;

import com.chat.ariana.Model.Auth.AuthResponse;
import com.chat.ariana.Model.Auth.LoginRequest;
import com.chat.ariana.Model.Auth.RegisterRequest;
import com.chat.ariana.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chat/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody LoginRequest request){
        return ResponseEntity.ok(authService.authenticate(request));
    }

}
