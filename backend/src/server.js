import app from "./app.js";
import env from "./config/env.js";
import connectDb from "./config/db.js";

const PORT = env.PORT;
const startServer = async () => {
    try {
        await connectDb();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }

}

startServer()