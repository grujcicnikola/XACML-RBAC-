package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
//		System.setProperty("javax.net.ssl.trustStore","src/main/resources/scsTrusted.jks");
//        System.setProperty("javax.net.ssl.trustStorePassword","password");
//		
//		System.setProperty("KEY_STORE_CLASSPATH", "src/main/resources/scs.jks");
//		System.setProperty("KEY_STORE_CLASSPATH_TRUST", "src/main/resources/scsTrusted.jks");
//		System.setProperty("KEY_STORE_PASSWORD", "password");
//		System.setProperty("KEY_STORE_TRUST_PASSWORD", "password");
//		System.setProperty("KEY_STORE_ALIAS", "scs");
		
		SpringApplication.run(BackendApplication.class, args);
		System.out.println("Backend started");
	}

}
