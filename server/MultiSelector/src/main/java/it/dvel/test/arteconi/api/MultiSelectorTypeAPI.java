package it.dvel.test.arteconi.api;

import java.util.Date;
import java.text.SimpleDateFormat;
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



/** REST API endpoint for "/{type}/" requests
possible "type" values: "actor", "director", "movie"
 */
@Path("/keywords/{type: (actor|director|movie)}")
public class MultiSelectorTypeAPI {

	
	/** REST API endpoint for GET request "/{type}/{label}"
	"label" is the search string used for case insensitive search in items of type "type"
 	*/
	@GET
	@Path("/{label}")
	@Produces(MediaType.APPLICATION_JSON)  
	public Response getByTypeAndValue(@PathParam("type") String type, @PathParam("label") String label) {		
		
		String result = "";
		Status status = Status.OK;
		long timer = 0;
		String formattedDate = "";
		
		try{
			timer = System.currentTimeMillis();

			SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd-HH:mm:ss");
			Date date = new Date(timer);
			formattedDate = formatter.format(date);

			//sleeps a random amount of milliseconds (0-500) to simulate network latency
			long fakeWait = (long)(Math.random() * 500);
			Thread.sleep(fakeWait);

			//works on "item" collection of the mongo db defined by the connection
			MongoCollection collection = MongoDbConnection.getInstance().getDatabase().getCollection("item");

			//prepares the regexp for thedb search
			Pattern pattern = Pattern.compile("^.*" + label + ".*$", Pattern.CASE_INSENSITIVE);

			//executes the query to the mongo db
			MongoCursor<Document> cursor = collection.find(
				and(
					eq("type", type), 
					regex("label", pattern)
				)
			).projection(fields(exclude("type"), excludeId())).iterator();
			
			//build a string representing the obtained result in json
			result = "[";
			while(cursor.hasNext()){
				result = result.concat(cursor.next().toJson());
				if(cursor.hasNext()){
					result = result.concat(", \n");
				}
			}

			//everything went good, response status 200
			result = result.concat("]");
			status = Status.OK;
			timer = System.currentTimeMillis() - timer;
		}
		catch(Exception e){
			//if any error occurred a 500 response status and empty result is returned
			status = Status.INTERNAL_SERVER_ERROR;
			result = "";			
			System.err.println(e.getMessage());						
		}
		finally{
			System.out.println(formattedDate + ": " + status + ": /" + type + "/" + label + " - " + timer + "ms");
			return Response.status(status)
			.header("Access-Control-Allow-Origin", "*")
			.header("Access-Control-Allow-Credentials", "true")
			.header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
			.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
			.entity(result).build();
		}		
	}
}
