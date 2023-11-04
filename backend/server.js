const express = require('express');
const mongoose = require('mongoose');
const Router = require("./routes");
require('dotenv').config();
const cors = require('cors')
const app = express();
mongoose.set('strictQuery', false);
app.use(express.json());
app.use(cors(["http://localhost:5173"]))
const PORT = 3000;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
    } catch (err) {
        console.log(err);
    }
}

connectDB()
app.use(Router);

mongoose.connection.once("open", () => {
	console.log("Connected to MongoDB");
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
	console.log(err);
	logEvents(
		`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
		"mongoErrLog.log"
	);
});