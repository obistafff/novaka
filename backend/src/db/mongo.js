import "dotenv/config";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is missing");

// Force IPv4 in WSL (avoids auth handshake weirdness via IPv6/localhost)
const client = new MongoClient(uri, { family: 4 });

let db = null;

export async function getMongoDb() {
  if (db) return db;
  await client.connect();
  db = client.db("novaka");
  return db;
}

export async function closeMongo() {
  await client.close();
  db = null;
}
