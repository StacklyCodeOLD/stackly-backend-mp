const express = require("express");
//const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser");
//const passport = require("passport");
const config = require("./config/db");
const cors = require("cors");

const authRoute = require("./routes/auth-route");
const users = require("./routes/user");
const package = require("./package.json");

const { getLogger, logHandler, terminate } = require("@jwt/utils");
//require("./config/passport")(passport);

const app = express();
const log = getLogger(__dirname, __filename);
const PORT = process.env.PORT || 4000;

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",

}));
//app.use(passport.initialize());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logHandler);

app.use("/api/users", users);
app.use("/api", authRoute);

app.disable("etag");
app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.status(200).json({
    nombre: package.name,
    version: package.version,
    status: `En línea hace ${parseInt(process.uptime())} segundos`,
    empresa: "https://www.stacklycode.com",
    comunidad: "https://discord.stacklycode.com",
  });
});

if (!module.parent) {
  app.listen(PORT, () => {
    log.info(`Server funcionando en puerto ${PORT}`);
  });

  process.on("SIGINT", terminate(0, "SIGINT"));
  process.on("SIGTERM", terminate(0, "SIGTERM"));
  process.on("uncaughtException", terminate(1, "uncaughtException"));
  process.on("unhandledRejection", terminate(1, "unhandledRejection"));
}
