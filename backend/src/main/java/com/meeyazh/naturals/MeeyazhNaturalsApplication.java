package com.meeyazh.naturals;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class MeeyazhNaturalsApplication {

  public static void main(String[] args) {
    SpringApplication.run(MeeyazhNaturalsApplication.class, args);
  }

}
