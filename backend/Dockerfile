FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests

EXPOSE 10000

CMD ["java", "-jar", "target/*.jar"]
