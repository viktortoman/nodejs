const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path: "./config.env"})
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
}).then(() => {
    console.log("DB connection successful!");
})

const app = require("./app");
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

module.exports = app;