// seedQuestions.js

const mongoose = require("mongoose");
const Question = require("./models/Question.js");
const User = require("./models/User.js");
const dummyDataRaw = require("./dummyData.js"); // This should export the array from your canvas

const start = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/stackit", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected ✅");

    // Fetch all users to map usernames to _id
    const users = await User.find({});
    const userMap = {};
    users.forEach((user) => {
      userMap[user.username] = user._id;
    });

    // Map raw dummy data with proper ObjectId authors
    const dummyData = dummyDataRaw.map((q) => ({
      ...q,
      author: userMap[q.author], // Convert string to ObjectId
    }));

    // Optional: Clear existing data
    await Question.deleteMany({});
    console.log("Old questions deleted 🧹");

    // Insert updated dummy data
    await Question.insertMany(dummyData);
    console.log("Dummy questions inserted successfully 🚀");

    process.exit(0);
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
};

start();
