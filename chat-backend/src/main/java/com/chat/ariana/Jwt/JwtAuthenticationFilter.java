package com.chat.ariana.Jwt;


import com.chat.ariana.services.JwtService;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // Obtener el encabezado Authorization
        final String authHeader = request.getHeader("Authorization");

        // Los tokens JWT se envían como "Bearer <token>"
        // Si el encabezado no existe o no comienza con Bearer, omitir este filtro
        if(authHeader == null || !authHeader.startsWith("Bearer")){
            filterChain.doFilter(request,response);
            return;
        }

        // Extraer el token (todo lo que está después de "Bearer ")
        final String jwt = authHeader.substring(7);

        try{
            final String username = jwtService.extractUsername(jwt);

            // Si tenemos un nombre de usuario y todavía no existe una autenticación
            if(username != null && SecurityContextHolder.getContext().getAuthentication() == null){
                // Cargar los datos del usuario desde la base de datos
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

                // Validar el token
                if(jwtService.isTokenValid(jwt,userDetails)){
                    // Crear el token de autenticación
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null, // No se necesitan credenciales: el JWT ya fue validado
                            userDetails.getAuthorities()
                    );
                    // Adjuntar los detalles de la petición
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    // Establecer la autenticación en el contexto de seguridad
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        }catch (JwtException | IllegalArgumentException e){
            // Limpiar el contexto de seguridad
            System.out.println(e.getMessage());
            SecurityContextHolder.clearContext();
        }
        // Continuar con la cadena de filtros
        filterChain.doFilter(request,response);

    }
}
