const { ActivityRoute } = require("./activity");
const { AuthRoute } = require("./auth");
const { ContactRoute } = require("./contact");
const { DealRoute } = require("./deal");
const { FileRoute } = require("./file");
const { DealItemRoute, ItemRoute } = require("./item");
const { LabelRoute } = require("./label");
const { NoteRoute } = require("./note");
const { PipelineRoute } = require("./pipeline");
const { StageRoute } = require("./stage");
const { UserRoute } = require("./user");

const passportJWT = require("../middlewares/auth/passport-jwt");

function Routes(app) {
  app.use(
    "/api/activity",
    passportJWT.authenticate("jwt", { session: false }),
    ActivityRoute
  );
  app.use(
    "/api/deal",
    passportJWT.authenticate("jwt", { session: false }),
    DealRoute
  );
  app.use(
    "/api/file",
    passportJWT.authenticate("jwt", { session: false }),
    FileRoute
  );
  app.use(
    "/api/label",
    passportJWT.authenticate("jwt", { session: false }),
    LabelRoute
  );
  app.use(
    "/api/note",
    passportJWT.authenticate("jwt", { session: false }),
    NoteRoute
  );
  app.use(
    "/api/pipeline",
    passportJWT.authenticate("jwt", { session: false }),
    PipelineRoute
  );
  app.use(
    "/api/stage",
    passportJWT.authenticate("jwt", { session: false }),
    StageRoute
  );
  app.use(
    "/api/contact",
    passportJWT.authenticate("jwt", { session: false }),
    ContactRoute
  );
  app.use(
    "/api/user",
    passportJWT.authenticate("jwt", { session: false }),
    UserRoute
  );
  app.use(
    "/api/product-service",
    passportJWT.authenticate("jwt", { session: false }),
    ItemRoute
  );
  app.use(
    "/api/deal-product-service",
    passportJWT.authenticate("jwt", { session: false }),
    DealItemRoute
  );
  app.use("/auth", AuthRoute);
}

module.exports = Routes;
