import dotenv from "dotenv"

dotenv.config();

const env = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    ACCESS_EXPIRY : process.env.ACCESS_EXPIRY,
    REFRESH_EXPIRY : process.env.REFRESH_EXPIRY
};

export default env;