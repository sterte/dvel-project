package it.dvel.test.arteconi.db;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;


public class MongoDbConnection {

    private static MongoDbConnection instance; 
    private static MongoClient mongoClient;
    private static MongoDatabase db;

    private static final String dbHost = "localhost";
    private static final int dbPort = 27017;
    private static final String dbName = "dvel";
    //private static final String dbUser = "dbUser here";
    //private static final String dbPassword = "dbPassword here";

    MongoDbConnection(){    
        mongoClient = new MongoClient(dbHost , dbPort);    
        db = mongoClient.getDatabase(dbName);
    }

    public static MongoDbConnection getInstance(){
        if(instance == null){
            instance = new MongoDbConnection();
        }
        return instance;
    }

    public MongoDatabase getDatabase(){
        return db;
    }

}

