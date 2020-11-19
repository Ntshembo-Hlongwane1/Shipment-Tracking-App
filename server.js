import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import expressSession from "express-session";
import MongoStore from "connect-mongodb-session";
import AUthRoute from "./Routes/Auth";
import AccountRecoveryRoute from "./Routes/AccountRecovery";
dotenv.config();

const app = express();

//=====================================================Middlewares======================================================
app.use(
  cors({
    origin: "http://127.0.0.1:3000",
    credentials: true,
  })
);

const mongoStore = MongoStore(expressSession);

const store = new mongoStore({
  collection: "usersessions",
  uri: process.env.mongoURI,
  expires: 10 * 24 * 60 * 60 * 1000,
});

app.use(
  expressSession({
    secret: process.env.session_secret,
    name: "_sid",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 10 * 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "production",
    },
  })
);

//================================================MongoDB Configs & Connection==========================================
const mongoURI = process.env.mongoURI;
const Connection_options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(mongoURI, Connection_options, (error) => {
  if (error) {
    return console.log(error);
  }

  console.log("Connection to MongoDB was successful");
});

//========================================================Server Endpoint===============================================
app.use(AUthRoute);
app.use(AccountRecoveryRoute);

//=================================================Server Configs & Connection==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
