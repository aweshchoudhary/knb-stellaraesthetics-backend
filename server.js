const express = require("express");
const passport = require("passport");
const dotenv = require("dotenv");
const cors = require("cors");

const connect_db = require("./config/connect_db");
const main_routes = require("./routes/main_routes");
const auth_routes = require("./routes/auth_routes");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 5000;

// Environment Variables
dotenv.config();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(
  cors({
    origin: [
      "https://knb-stellaraesthetics.netlify.app",
      "http://localhost:5173",
    ],
  })
);
app.use(passport.initialize());

app.use(morgan("dev"));
app.use("/api", main_routes);
app.use("/auth", auth_routes);

app.listen(port, () => console.log(`Server is started on port ${port}`));
connect_db();
