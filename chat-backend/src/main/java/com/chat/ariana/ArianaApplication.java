package com.chat.ariana;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class ArianaApplication {

	public static void main(String[] args) {
		SpringApplication.run(ArianaApplication.class, args);

	}

}
