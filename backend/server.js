const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors')
const app = express();
mongoose.set('strictQuery', false);
app.use(express.json());
app.use(cors(["http://localhost:5173"]))
const PORT = 3000;

// Define a User schema for question data
const userSchema = new mongoose.Schema({
    fullName: String,
    licenseID: String,
    primaryEmailAddress: {
      address: String,
      verified: Boolean,
    },
    primaryPhoneNumber: {
      number: String,
      verified: Boolean,
    },
    externalAccounts: [
      {
        provider: String,
        externalId: String,
        verified: Boolean,
      },
    ],
  });

// Create a Mongoose model based on the schema
const User = mongoose.model('User', userSchema);

// CRUD routes for users

// Create a new user
app.post('/user', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find().lean();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a user by ID
app.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send('User not found');
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a user by ID
app.put('/user/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      res.status(404).send('User not found');
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a user by ID
app.delete('/user/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).send('User not found');
    } else {
      res.status(200).send('User successfully deleted');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
    } catch (err) {
        console.log(err);
    }
}

connectDB()

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