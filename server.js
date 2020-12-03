import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import expressSession from "express-session";
import MongoStore from "connect-mongodb-session";
import AUthRoute from "./Routes/Auth";
import AccountRecoveryRoute from "./Routes/AccountRecovery";
import ShipmentRoutes from "./Routes/ShipmentRoutes";
import path from "path";
dotenv.config();

const app = express();

const origin = {
  dev: "http://localhost:3000",
  production: `https://shipment-tracker-web-app.herokuapp.com`,
};

//=====================================================Middlewares======================================================
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production" ? origin.production : origin.dev,
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

//================================================Production Setup======================================================
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (request, response) => {
    response.sendFile(
      path.resolve(__dirname, "./client", "build", "index.html")
    );
  });
}

//========================================================Server Endpoint===============================================
app.use(AUthRoute);
app.use(AccountRecoveryRoute);
app.use(ShipmentRoutes);

//=================================================Server Configs & Connection==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
