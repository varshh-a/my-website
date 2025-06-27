// server/db.ts
import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://varshinisivapu0:HM0Pkl96Xh149VmM@cluster0.wodcetf.mongodb.net/mydb?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

export async function connectDB() {
  await client.connect();
  return client.db('mydb'); // use the exact DB name you created
}