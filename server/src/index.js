import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app  from "./app.js"
dotenv.config({
    path: "./env"
});




connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log("Error on Before start of server: ", error);
            process.exit(1)
        })
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running at port :
            ${process.env.PORT}`);

        })
    })
    .catch((err) => {
        console.log("MONGODB connection failed !!! ", err);

    })