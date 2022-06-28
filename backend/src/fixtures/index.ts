import bcrypt from "bcryptjs";
import connect from "config/mongoose";
import { env } from "config/vars";
import User from "models/user.model";
import { connection, Model } from "mongoose";
// user
import users from "./users.json";

const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(null), ms);
  });

const dropped: string[] = [];

async function generateDocs(
  documents: any[],
  model: Model<any>,
  counter?: number
) {
  try {
    if (!dropped.find((name) => name === model.collection.name)) {
      await model.collection.drop();
      dropped.push(model.collection.name);
    }
    await model.insertMany(documents);
  } catch (e: any) {
    if (e.message === "ns not found") {
      dropped.push(model.collection.name);
    }
    if (!counter || counter < 5) {
      await delay(1000);
      await generateDocs(documents, model, counter ? counter + 1 : 1);
    } else {
      console.log(e.message);
      process.exit(1);
    }
  }
}

async function generate() {
  await connect();

  /*** fixtures ***/
  if (env === "development") {
    await generateDocs(
      users.map((user) => ({
        ...user,
        password: bcrypt.hashSync(user.password),
      })),
      User
    );
  }
  /*** fixtures ***/

  await connection.close();
  process.exit(0);
}

generate();
