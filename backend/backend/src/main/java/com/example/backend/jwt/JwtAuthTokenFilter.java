package com.example.backend.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.backend.security.UserDetailsServiceImpl;

//Presrecemo svaki zahtev filterom i provervamo JWTFilter (cija putanja nije
//ukljucena u SecurityConfig.configure(..)
public class JwtAuthTokenFilter extends OncePerRequestFilter {

	@Autowired
	private JwtProvider tokenProvider;

	@Autowired
	private UserDetailsServiceImpl userDetailsService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		try {
			//preuzimamo token  iz zahteva
			String jwt = getJwt(request);
			if (jwt != null && tokenProvider.validateJwtToken(jwt)) {
				//uzmi username iz tokena
				String username = tokenProvider.getUserNameFromJwtToken(jwt);
				UserDetails userDetails = userDetailsService.loadUserByUsername(username);
				
				//kreiraj autentikaciju
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

				SecurityContextHolder.getContext().setAuthentication(authentication);
			}
		} catch (Exception e) {
			logger.error("Can NOT set user authentication -> Message: {}", e);
		}

		filterChain.doFilter(request, response);
	}

	private String getJwt(HttpServletRequest request) {
		//token se nalazi u okviru headera. 
		//(polje Authorization:
		//				Bearer: JWT)
		String authHeader = request.getHeader("Authorization");

		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			return authHeader.replace("Bearer ", "");
		}

		return null;
	}

}
