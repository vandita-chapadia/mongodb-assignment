import express from "express";
import "./db/dbConnection.js";
import userRoute from "./routers/users.js";
import lotteryRoute from "./routers/lottery.js";
import adminRoute from "./routers/admin.js";
import pkg from "i18n";
const { I18n, __ } = pkg;
import helmet from "helmet";
import "./common/node_scheduler.js";
import swaggerUI from "swagger-ui-express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerDocument = require("../swagger.json");

const i18n = new I18n();
i18n.configure({
  locales: ["en", "fr"],
  directory: "./locales",
});

const app = express();

app.use(i18n.init);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(helmet());
app.use(express.json());
app.use("/user", userRoute);
app.use("/lottery", lotteryRoute);
app.use("/admin", adminRoute);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    success: 0,
    message: res.__(err.message),
    status: err.status,
    stack: err.stack,
  });
});

export default app;
