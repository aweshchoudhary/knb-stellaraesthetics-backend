const express = require("express");
const passport = require("passport");
const dotenv = require("dotenv");
const cors = require("cors");

const connect_db = require("./config/connect_db");
const main_routes = require("./routes/main_routes");
const auth_routes = require("./routes/auth_routes");
const user_routes = require("./routes/user_routes");

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
      "https://u92x7hco3fvb.stellaraesthetics.in",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

app.use(morgan("dev"));
app.use("/api", main_routes);
app.use("/api", user_routes);
app.use("/auth", auth_routes);

app.listen(port, () => console.log(`Server is started on port ${port}`));
connect_db();
