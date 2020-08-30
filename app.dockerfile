FROM openjdk:11
COPY ./target/ecommerce.jar ecommerce.jar
ENTRYPOINT ["java", "-jar", "/ecommerce.jar"]