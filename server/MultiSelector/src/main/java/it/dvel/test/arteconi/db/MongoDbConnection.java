package it.dvel.test.arteconi.db;

import java.util.Properties;
import java.io.InputStream;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;

/** Class to manage connection to mongo database
it is a singleton in order to initialize the connection only once as long as the server is running
*/
public class MongoDbConnection {

    private static MongoDbConnection instance; 
    private static MongoClient mongoClient;
    private static MongoDatabase db;

    private static final String propertiesFilename = "configuration.properties";    

    /** Connects to the defined database (without authentication)
    */
    MongoDbConnection(){
        try{
            Properties properties = new Properties();
            InputStream inputStream = getClass().getClassLoader().getResourceAsStream(propertiesFilename);
            properties.load(inputStream);
            mongoClient = new MongoClient(properties.getProperty("db.host") , new Integer(properties.getProperty("db.port")));    
            db = mongoClient.getDatabase(properties.getProperty("db.name"));
        }
        catch(Exception e){
            System.err.println(e.getMessage());
            db = null;
        }
    }

    /** Creates (if necessary) the singleton connection and returns it
    @return a MongoDbConnection instantiated and initialized for the server, port and dbname defined in the properties
     */
    public static MongoDbConnection getInstance(){
        if(instance == null){
            instance = new MongoDbConnection();
        }
        return instance;
    }

    /** Creates (if necessary) the singleton connection and returns it
    @return a connector to the MongoDatabase "dbname" defined in properties related to the connection instance
     */
    public MongoDatabase getDatabase(){
        return db;
    }

}

