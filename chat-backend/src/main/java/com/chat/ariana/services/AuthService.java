package com.chat.ariana.services;

import com.chat.ariana.Model.Auth.AuthResponse;
import com.chat.ariana.Model.Auth.LoginRequest;
import com.chat.ariana.Model.Auth.RegisterRequest;
import com.chat.ariana.Model.Usuario;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UsuarioService usuarioService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    //Aqui utilizamos la clase RegisterRequest,
    //Necesitaremos nombre, email, y contraseña
    public AuthResponse register(RegisterRequest request){
        // Creamos un nuevo usuario con contraseña codificada
        Usuario user = new Usuario();
        user.setNombre(request.getNombre());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFecha_union(LocalDate.now());

        //Guardar en la base de datos
        Usuario usuarioGuardado = usuarioService.guardarUsuario(user);

        String token = jwtService.generateToken(user.getEmail());
        return new AuthResponse(token,
                usuarioGuardado.getId_usuario(),
                usuarioGuardado.getEmail()
        );
    };


    //Aqui utilizaremos la autenticacion, o sea, verificaremos
    //si los datos son válidos. Aqui utilizaremos la clase LoginRequest
    //que solo pide el email y contraseña
    public AuthResponse authenticate(LoginRequest loginRequest){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );
        Usuario usuario = usuarioService.obtenerUsuarioPorEmail(loginRequest.getEmail());
        String jwtToken = jwtService.generateToken(loginRequest.getEmail());
        return new AuthResponse(jwtToken, usuario.getId_usuario(), usuario.getEmail());

    }
}
