const express = require("express");
const passport = require("passport");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const connect_db = require("./config/connect_db");
const activity_routes = require("./routes/activity_routes");
const contact_routes = require("./routes/contact_routes");
const deal_routes = require("./routes/deal_routes");
const file_routes = require("./routes/file_routes");
const label_routes = require("./routes/label_routes");
const note_routes = require("./routes/note_routes");
const pipeline_routes = require("./routes/pipeline_routes");
const stage_routes = require("./routes/stage_routes");
const auth_routes = require("./routes/auth_routes");
const user_routes = require("./routes/user_routes");
const product_service_routes = require("./routes/product_service_routes");

const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const passportJWT = require("./auth/passport-jwt");

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

app.use(
  "/api/activity",
  passportJWT.authenticate("jwt", { session: false }),
  activity_routes
);
app.use(
  "/api/deal",
  passportJWT.authenticate("jwt", { session: false }),
  deal_routes
);
app.use(
  "/api/file",
  passportJWT.authenticate("jwt", { session: false }),
  file_routes
);
app.use(
  "/api/label",
  passportJWT.authenticate("jwt", { session: false }),
  label_routes
);
app.use(
  "/api/note",
  passportJWT.authenticate("jwt", { session: false }),
  note_routes
);
app.use(
  "/api/pipeline",
  passportJWT.authenticate("jwt", { session: false }),
  pipeline_routes
);
app.use(
  "/api/stage",
  passportJWT.authenticate("jwt", { session: false }),
  stage_routes
);
app.use(
  "/api/contact",
  passportJWT.authenticate("jwt", { session: false }),
  contact_routes
);
app.use(
  "/api/user",
  passportJWT.authenticate("jwt", { session: false }),
  user_routes
);
app.use(
  "/api/product-service",
  passportJWT.authenticate("jwt", { session: false }),
  product_service_routes
);
app.use("/auth", auth_routes);

app.listen(port, () => console.log(`Server is started on port ${port}`));
connect_db();
