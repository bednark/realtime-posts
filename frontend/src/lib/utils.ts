"use server";
import mongoose from "mongoose";

const dbHost = process.env.MONGO_HOST || "mongodb";
const dbPort = process.env.MONGO_PORT || 27017;
const dbName = process.env.MONGO_DB || "realtime-posts";
const connectionString = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${dbHost}:${dbPort}/${dbName}?retryWrites=true&w=majority`;

const dbConnection = {
  isConnected: 0
};

const connectToDatabase = async () => {
  try {
    if (dbConnection.isConnected) {
      console.log('Using existing connection');
      return;
    }
    const db = await mongoose.connect(connectionString);
    dbConnection.isConnected = db.connections[0].readyState;
  }
  catch (error) {
    console.error(error);
    throw new Error((error as Error).message);
  }
}

export default connectToDatabase;