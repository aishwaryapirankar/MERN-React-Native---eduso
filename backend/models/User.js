
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: "Invalid Email address" });
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  image: {
    type: String
  },
  age: {
    type: Number
  },
  qualification: {
    type: String
  },
  interests: {
    type: String
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  userPosts: [
    {
      Post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    },
  ],
  userFavPosts: [
    {
      post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    },
  ],
})

userSchema.pre("save", async function (next) {
    // Hash the password before saving the user model
    const user = this;
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
      user.conPassword = user.password;
    }
    next();
});

userSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return ({token});
};
  
userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email });
    if (!user) {
      res.send("Invalid login credentials");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      res.send("Invalid login credentials");
    }
    return user;
};
  
const User = mongoose.model("User", userSchema);
  
module.exports = User;