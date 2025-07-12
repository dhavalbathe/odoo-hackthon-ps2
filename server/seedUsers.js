// seedUsers.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Adjust path if needed

const users = [
  {
    username: 'user1',
    email: 'user1@example.com',
    password: 'password1'
  },
  {
    username: 'user2',
    email: 'user2@example.com',
    password: 'password2'
  },
  {
    username: 'user3',
    email: 'user3@example.com',
    password: 'password3'
  },
  {
    username: 'user4',
    email: 'user4@example.com',
    password: 'password4'
  },
  {
    username: 'user5',
    email: 'user5@example.com',
    password: 'password5'
  }
];

const start = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/stackit', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB ✅');

    await User.deleteMany({});
    console.log('Existing users deleted 🧹');

    // Hash passwords and insert users
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword };
      })
    );

    const insertedUsers = await User.insertMany(hashedUsers);
    console.log('Users inserted successfully 🚀');

    // Show user IDs for use in seedQuestions
    insertedUsers.forEach((user) => {
      console.log(`${user.username}: ${user._id}`);
    });

    process.exit(0);
  } catch (err) {
    console.error('Error seeding users:', err);
    process.exit(1);
  }
};

start();
