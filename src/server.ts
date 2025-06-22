import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";
import { router } from "./routes";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.use('/api', router);


app.get("/",(req,res)=>{
 res.send("i am samrat")
})

app.listen(config.port, () => {
  console.log(`👌Server running on port ${5000}`);
});

async function server() {
  try {
    await mongoose.connect(config.database_url as string);

    console.log(`👌Database connected successfully`);
  } catch (error) {
    console.error(`server error ${error}`);
  }
}
server();
