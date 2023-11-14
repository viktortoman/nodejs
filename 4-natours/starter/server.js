const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path: "./config.env"})
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
}).then(() => {
    console.log("DB connection successful!");
});

const app = require("./app");
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", err => {
    console.log(err.name, err.message);
    console.log("UNHANDLED REJECTION! Shutting down...");

    server.close(() => {
        process.exit(1);
    });
})

process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    console.log("UNCAUGHT EXCEPTION! Shutting down...");

    server.close(() => {
        process.exit(1);
    });
})

module.exports = app;