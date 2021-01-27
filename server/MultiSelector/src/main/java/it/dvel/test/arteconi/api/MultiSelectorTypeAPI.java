package it.dvel.test.arteconi.api;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import it.dvel.test.arteconi.db.MongoDbConnection;
import java.util.regex.Pattern;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import org.bson.Document;


import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Projections.*;




@Path("/{type: (actor|director|movie)}")
public class MultiSelectorTypeAPI {

	@GET
	@Path("/{value}")
	@Produces(MediaType.APPLICATION_JSON)  
	public Response getByTypeAndValue(@PathParam("type") String type, @PathParam("value") String value) {
		String result = "";		
		MongoCollection collection = MongoDbConnection.getInstance().getDatabase().getCollection("item");
		Pattern pattern = Pattern.compile("^.*" + value + ".*$", Pattern.CASE_INSENSITIVE);
		MongoCursor<Document> cursor = collection.find(and(eq("type", type), regex("label", pattern))).projection(fields(exclude("type"), excludeId())).iterator();
		while(cursor.hasNext()){
			result = result.concat(cursor.next().toJson());
		}
		Status status = result.isEmpty() ? Status.NOT_FOUND : Status.OK;
		return Response.status(status).entity(result).build();
	}
}