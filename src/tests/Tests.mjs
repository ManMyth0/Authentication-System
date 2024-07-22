// For User schema testing ( 'npm run tests' to initiate )

import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { expect } from "chai";
import bcrypt from "bcrypt";
import User from "../schemas/userSchema.js"; // Ensure this path and extension is correct


// Testing the User schema ---------------------------------------------
describe("User Schema", function() {
  let mongoServer;

  // Increased the default timeout to 10 seconds
  this.timeout(10000);

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  after(async () => {
    await mongoServer.stop();
    if (mongoServer) {
      await mongoose.disconnect();
    }
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("should hash the password before saving", async function() {
    const user = new User({ username: "User1!", email: "test@example.com", password: "Password1!" });
    await user.save();
    const savedUser = await User.findOne({ username: "User1!" });

    expect(savedUser).to.exist;
    expect(savedUser.password).to.not.equal("Password1!");
    const isMatch = await bcrypt.compare("Password1!", savedUser.password);
    expect(isMatch).to.be.true;
  });

  it("should validate the email format", async function() {
    const user = new User({ username: "User2!", email: "invalidEmail", password: "Password1!" });
    try {
      await user.save();
    } catch (error) {
      expect(error.errors.email).to.exist;
      expect(error.errors.email.message).to.equal("Please enter a valid email!");
    }
  });

  it("should enforce password special character validation", async function() {
    const user = new User({ username: "User3!", email: "test@example.com", password: "password1" });
    try {
      await user.save();
    } catch (error) {
      expect(error.errors.password).to.exist;
      expect(error.errors.password.message.trim()).to.equal("Invalid password! Please include at least 1 letter, 1 number, no white spaces and 1 of these special characters: '!', '?', '.', '$', '~', '-', '*'");
    }
  });

  it("should enforce username minimum character validation", async function() {
    const user = new User({ username: "", email: "uniqueEmail@example.com", password: "Password1!" });
    try {
      await user.save();
    } catch (error) {
      expect(error.errors.username).to.exist;
      expect(error.errors.username.message.trim()).to.equal("Please enter a username!");
    }
  });

  it("should enforce username maximum character validation", async function() {
    const user = new User({ username: "a".repeat(17), email: "uniqueEmail2@example.com", password: "Password1!" });
    try {
      await user.save();
    } catch (error) {
      expect(error.errors.username).to.exist;
      expect(error.errors.username.message.trim()).to.equal("Username must be a maximum of 16 characters long!");
    }
  });

  it("should enforce username special character validation", async function() {
    const user = new User({ username: "invalidusername", email: "uniqueEmail3@example.com", password: "Password1!" });
    try {
      await user.save();
    } catch (error) {
      expect(error.errors.username).to.exist;
      expect(error.errors.username.message.trim()).to.equal("Invalid username. Please do not include any white spaces and have at least at least 1 number, 1 letter and 1 special character from this list: '!', '?', '.', '$', '~', '-', '*'");
    }
  });

  it("should enforce username uniqueness", async function() {
    const user1 = new User({ username: "uniqueUser1!", email: "test1@example.com", password: "Password1!" });
    const user2 = new User({ username: "uniqueUser1!", email: "test2@example.com", password: "Password2!" });

    await user1.save();

    try {
      await user2.save();
    } catch (error) {
      expect(error.code).to.equal(11000); // To test MongoDB duplicate key error code
      expect(error.keyValue).to.have.property('username', 'uniqueUser1!');
    }
  });

  it("should enforce username to contain at least one letter, one number, and one special character", async function() {
    const user = new User({ username: "invalidusername", email: "uniqueEmail4@example.com", password: "Password1!" });
    try {
      await user.save();
    } catch (error) {
      expect(error.errors.username).to.exist;
      expect(error.errors.username.message.trim()).to.equal("Invalid username. Please do not include any white spaces and have at least at least 1 number, 1 letter and 1 special character from this list: '!', '?', '.', '$', '~', '-', '*'");
    }
  });

  it("should enforce password to contain at least one letter, one number, and one special character", async function() {
    const user = new User({ username: "validUser!", email: "uniqueEmail5@example.com", password: "password1" });
    try {
      await user.save();
    } catch (error) {
      expect(error.errors.password).to.exist;
      expect(error.errors.password.message.trim()).to.equal("Invalid password! Please include at least 1 letter, 1 number, no white spaces and 1 of these special characters: '!', '?', '.', '$', '~', '-', '*'");
    }
  });
});
// User schema test ends here -----------------------------------------------