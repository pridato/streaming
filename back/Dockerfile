FROM openjdk:21-jdk

WORKDIR /back

COPY target/streaming-0.0.1-SNAPSHOT.jar app.jar


# Exponer el puerto en el que tu aplicación Spring Boot corre
EXPOSE 8080

# El comando para ejecutar tu aplicación Spring Boot
ENTRYPOINT ["java", "-jar", "app.jar"]