import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();

const client = new MongoClient(process.env.ATLAS_URI);

let conn;

try {
    conn = await client.connect();
    console.log(`Connected to Mongo!`);
} catch (err) {
    console.error(err);
}

let db = conn.db("sample_training");

export default db;