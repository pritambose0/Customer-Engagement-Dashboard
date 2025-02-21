import mongoose from "mongoose";
const { connect, connection } = mongoose;
import { User } from "../models/user.model.js";
import { Engagement } from "../models/engagement.model.js";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

import { DB_NAME } from "../constants.js";

// Connect to MongoDB
connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const getRetentionCategory = (score) => {
  if (score <= 81) return "Low";
  if (score <= 163) return "Medium";
  return "High";
};

const generateRandomUsers = async (numUsers) => {
  for (let i = 0; i < numUsers; i++) {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const lastLogin = faker.date.recent({
      days: faker.helpers.arrayElement([3, 7, 15, 30, 60, 90, 120]),
    });

    // Generate random engagement data
    const logins = faker.number.int({ min: 0, max: 10 });
    const featureUsage = faker.number.int({ min: 0, max: 15 });
    const timeSpent = faker.number.int({ min: 5, max: 120 });
    const profileUpdates = faker.number.int({ min: 0, max: 3 });
    const comments = faker.number.int({ min: 0, max: 5 });

    // Calculate engagement score
    const engagementScore =
      logins * 2 +
      featureUsage * 5 +
      timeSpent +
      profileUpdates * 3 +
      comments * 4;

    // Assign retention category based on score
    const retentionCategory = getRetentionCategory(engagementScore);

    // Create user
    let user = new User({ name, email, lastLogin, retentionCategory });
    await user.save();

    // Save engagement data
    const engagementData = new Engagement({
      userId: user._id,
      logins,
      featureUsage,
      timeSpent,
      profileUpdates,
      comments,
    });

    await engagementData.save();

    console.log(`Created user ${name}.`);
  }
};

// Generate 10 test users
generateRandomUsers(10).then(() => {
  console.log("Test data generation completed!");
  connection.close();
});
