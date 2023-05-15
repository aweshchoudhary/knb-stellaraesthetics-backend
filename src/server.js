const express = require("express");
const passport = require("passport");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const connect_db = require("./config/connect_db");
const Routes = require("./modules/routes");

const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 5000;

// Environment Variables
dotenv.config();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://knb-stellaraesthetics.netlify.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

app.use(morgan("dev"));
Routes(app);

app.listen(port, () => console.log(`Server is started on port ${port}`));
connect_db();
