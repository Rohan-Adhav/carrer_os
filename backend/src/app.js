import express from "express";
import router from "./routes/index.routes.js";
import notFound from "./middlewares/notFound.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"
import cookieparser from "cookie-parser"

const app = express();

app.use(helmet())

app.use(cors({
    origin:"*",
    credentials:true
}))

app.use(morgan("dev"))

app.use(express.json())

app.use(cookieparser())

app.use("/api",router);
app.use(notFound)
app.use(errorHandler)

export default app;