package com.app.streaming;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

import java.util.Objects;

@SpringBootApplication
public class StreamingApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.configure().load();

		// cargamos las variables de entorno para leerlas en application properties
		System.setProperty("SPRING_DATASOURCE_URL", Objects.requireNonNull(dotenv.get("SPRING_DATASOURCE_URL")));
		System.setProperty("SPRING_DATASOURCE_USERNAME", Objects.requireNonNull(dotenv.get("SPRING_DATASOURCE_USERNAME")));
		System.setProperty("SPRING_DATASOURCE_PASSWORD", Objects.requireNonNull(dotenv.get("SPRING_DATASOURCE_PASSWORD")));
		System.setProperty("SPRING_APPLICATION_NAME", Objects.requireNonNull(dotenv.get("SPRING_APPLICATION_NAME")));

		SpringApplication.run(StreamingApplication.class, args);
	}

}
