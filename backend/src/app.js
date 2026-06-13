import express from "express";
import router from "./routes/index.routes.js";
import notFound from "./middlewares/notFound.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use("/",router);
app.use(notFound)
app.use(errorHandler)

export default app;