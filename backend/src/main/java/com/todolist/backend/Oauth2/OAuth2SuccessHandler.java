package com.todolist.backend.Oauth2;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.todolist.backend.Entities.User;
import com.todolist.backend.Repositories.UsersRepo;
import com.todolist.backend.Security.JwtUtil;

import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;
    private final UsersRepo usersRepo;

    public OAuth2SuccessHandler(JwtUtil jwtUtil, UsersRepo usersRepo) {
        this.jwtUtil = jwtUtil;
        this.usersRepo = usersRepo;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication)
            throws ServletException, IOException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name") != null
                ? oAuth2User.getAttribute("name")
                : oAuth2User.getAttribute("login");

        if (email == null) {
            getRedirectStrategy().sendRedirect(request, response, "http://localhost:3000?error=email_not_available");
            return;
        }

        OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) authentication;
        String provider = authToken.getAuthorizedClientRegistrationId().toUpperCase();

        User user = usersRepo.findByEmail(email)
                .orElseGet(() -> usersRepo.save(User.builder()
                        .email(email)
                        .username(name)
                        .provider(provider)
                        .build()));

        String token = jwtUtil.generateToken(user);
        getRedirectStrategy().sendRedirect(request, response, "http://localhost:3000?token=" + token);
    }
}
