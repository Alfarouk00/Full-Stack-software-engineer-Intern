# --- Dockerfile for Spring Boot backend ---
FROM eclipse-temurin:17-jdk as build
WORKDIR /app
COPY . .
RUN ./gradlew clean bootJar --no-daemon

FROM eclipse-temurin:17-jre
WORKDIR /app
ENV SPRING_DATA_MONGODB_URI=mongodb://mongo:27017/itemsdb
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
