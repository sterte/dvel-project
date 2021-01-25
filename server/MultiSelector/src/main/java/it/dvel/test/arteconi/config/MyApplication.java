package it.dvel.test.arteconi.config;

import javax.ws.rs.ApplicationPath;

import org.glassfish.jersey.server.ResourceConfig;

@ApplicationPath("/")
public class MyApplication extends ResourceConfig {
    public MyApplication() {
        // if there are more than two packanges then separate them with semicolon
        // exmaple : packages("org.foo.rest;org.bar.rest");
        packages("it.dvel.test.arteconi.api");
    }
}