const express = require("express");
const jwt = require("jsonwebtoken");
const {check, validationResult} = require('express-validator');
const auth = require("../middleware/auth");
const User = require("../models/User");
const Post = require("../models/Post");
const Profile = require('../models/Profile');
const bcrypt = require('bcryptjs');
const router = express.Router();



const multer = require("multer");
const upload = multer({ dest: "../../images/" });

router.use("/images", express.static("../../images"));

const loginValidation = [
  check('email')
      .isEmail()
      .withMessage('Please provide a valid email'),
  check('password')
      .isLength({min: 6})
      .withMessage('Password must be at least six characters')
]

// =========================================User Authentication Routes=======================================

router.post("/users/register", async (req, res) => {
  // Create a new user

  try {
    const isUserEmail = await User.findOne({
      email: req.body.email,
    });
    if (isUserEmail) {
      res.send(" Email already registered");
    } else {
      const user = new User(req.body);
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
    alert(error);
  }
});

router.post("/users/login", async (req, res) => {
  //Login a registered user
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res
        .status(401)
        .send({ error: "Login failed! Check authentication credentials" });
    }
    const token = await user.generateAuthToken();
    res.send({ user, token });
    console.log(res.data);
  } catch (error) {
    res.status(400).send(error);
  }
});

  

router.get("/users/me/profile", auth, async (req, res) => {
  // View logged in user profile
  const u = await User.findOne({
    tokens: {
      $elemMatch: {
        token: req.token,
      },
    },
  }).populate("userPosts.Post");
  res.send(u);
});

router.post(
  "/users/me/createProfile",
  auth,
  //upload.single("image"),
  async (req, res) => {
    //create User Profile

    try {
      const user = await User.findOne({
        tokens: {
          $elemMatch: {
            token: req.token,
          },
        },
      });
      // let imagePath;
      // if (req.file) {
      //   imagePath = req.file.path;
      //   await user.updateOne({
      //     image: imagePath,
      //   });
      // }

      await user.updateOne({
        ...req.body,
      });
      const u = await User.findOne({
        tokens: {
          $elemMatch: {
            token: req.token,
          },
        },
      });

      res.status(201).send(u);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

//----------------------------------------------------User Create Expresso routes---------------------------------

router.post(
  "/users/me/createPost",
  auth,
  //upload.single("image"),
  async (req, res) => {

    try {
      const user = req.user;
      console.log(req.body);
      const post = new Post({
        ...req.body
      });
      await post.save();
      await User.findOneAndUpdate(
        {
          _id: user._id,
        },
        {
          $push: {
            userPosts: {
              post: post._id,
            },
          },
        }
      );
      const u = await User.findOne({
        tokens: {
          $elemMatch: {
            token: req.token,
          },
        },
      }).populate("userPosts.post");
      res.status(201).send({ u });
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

router.post("/users/me/deletePost", auth, async (req, res) => {
  try {
    const user = req.user;
    const postId = req.body.post_id;
    await Post.findOneAndDelete({ _id: postId });
    await User.updateMany(
      {
        userFavPosts: { $exists: true },
      },
      {
        $pull: {
          userFavPosts: {
            post: postId,
          },
        },
      }
    );

    const u = await User.findOneAndUpdate(
      {
        _id: user._id,
      },
      {
        $pull: {
          userPosts: {
            post: postId,
          },
        },
      }
    );
    res.status(201).send({ u });
  } catch (error) {
    res.status(500).send(error);
  }
});

// =====================================================Book-Mark Expresso==================================================

router.post("/users/me/addToFavorite", auth, async (req, res) => {
  try {
    const user = req.user;
    const postId = req.body.post_id;
    console.log(postId);

    const isPostFavorite = await User.findOne({
      userFavPosts: {
        post: postId,
      },
    });
    if (isPostFavorite) {
      throw new Error({ error: "Post already Favorited" });
    } else {
      await User.findOneAndUpdate(
        {
          _id: user._id,
        },
        {
          $push: {
            userFavPosts: {
              post: postId,
            },
          },
        }
      );
    }
    const u = await User.findOne({
      tokens: {
        $elemMatch: {
          token: req.token,
        },
      },
    }).populate("userFavPosts.post");
    res.status(201).send({ u });
  } catch (error) {
    res.status(400).send("Post present" + error);

    alert(error);
  }
});

router.get("/users/me/favoritePost", auth, async (req, res) => {
  try {
    const u = await User.findOne({
      tokens: {
        $elemMatch: {
          token: req.token,
        },
      },
    }).populate("userFavPosts.post");
    res.send(u);
  } catch (error) {}
});

module.exports = router;