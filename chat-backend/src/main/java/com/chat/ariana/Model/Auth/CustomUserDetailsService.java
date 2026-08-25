package com.chat.ariana.Model.Auth;


import com.chat.ariana.Model.Usuario;
import com.chat.ariana.services.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UsuarioService usuarioService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
            Usuario usuario = usuarioService.obtenerUsuarioPorEmail(email);

            if(usuario == null)
                throw new UsernameNotFoundException("Usuario no encontrado");

            return User.builder()
                    .username(usuario.getEmail())
                    .password(usuario.getPassword())
                    .roles("USER")
                    .build();

    }
}
