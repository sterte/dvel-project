package it.dvel.test.arteconi.api;

import javax.ws.rs.GET;

import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

@Path("/")
public class HelloWorldResource {

	@GET
	@Path("{name}")
	public String test(@PathParam("name") String name) {
		return "Ciao " + name.toUpperCase();
	}
}