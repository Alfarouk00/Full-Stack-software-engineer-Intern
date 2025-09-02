import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
public class WebConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        
        // Allow your frontend origin explicitly
        config.setAllowedOrigins(Arrays.asList(
    "http://localhost:3000",
    "https://psychic-space-giggle-4j6pgjjjrx96h5w7w-3000.app.github.dev"
));

        config.setAllowCredentials(true); // needed if sending cookies/auth headers
        config.addAllowedHeader("*"); // allow all headers
        config.addAllowedMethod("*"); // allow all HTTP methods (GET, POST, etc.)

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}
