const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path: "./config.env"})
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
}).then(() => {
    console.log("DB connection successful!");
})

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A tour must have a name"],
        unique: true
    },
    rating: {
        type: Number,
        default: 4
    },
    price: {
        type: Number,
        required: [true, "A tour must have a price"]
    }
});

const Tour = mongoose.model("Tour", tourSchema);

const app = require("./app");
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

module.exports = app;