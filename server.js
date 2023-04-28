const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connect_db = require("./config/connect_db");
const main_routes = require("./routes/main_routes");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 5000;

// Environment Variables
dotenv.config();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(cors());
app.use(morgan("dev"));
app.use("/api", main_routes);

app.listen(port, () => console.log(`Server is started on port ${port}`));
connect_db();
