const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");
const { validationResult } = require("express-validator");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: "SEND_GRID_API_KEY",
    },
  })
);

exports.postSignUp = (req, res, next) => {
  const email = req.body.email;
  const passwd = req.body.password;
  const full_name = req.body.full_name;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    throw error;
  }
  bcrypt
    .hash(passwd, 13)
    .then((hashedPasswd) => {
      const user = new User({
        email: email,
        password: hashedPasswd,
        full_name: full_name,
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "User added",
        userId: result._id,
      });
      return transporter
        .sendMail({
          to: email,
          from: "Email",
          subject: "SignUp Successful - MEVN Blogs",
          html: ` <h4>Thank you for registering with MEVN Blogs</h4>.
          <br>
          Thank You for trying out my app. Feel free to contact me for feedback.`,
        })
        .catch((err) => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postLogIn = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("User with email does not exist");
        error.statusCode = 404;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong Email or Password");
        error.statusCode = 404;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        "SecretStringHere",
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({
        token: token,
        userId: loadedUser._id.toString(),
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postResetPassword = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      const error = new Error("Some error occured during Reset");
      error.statusCode = 500;
      throw error;
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          const error = new Error("User Not Found");
          error.statusCode = 404;
          throw error;
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 600000;
        return user.save();
      })
      .then(() => {
        res.status(200).send();
        return transporter.sendMail({
          to: req.body.email,
          from: "Email",
          subject: "Password Reset - MEVN Blogs",
          html: `<h3>You had requested to reset your password. </h3>
            <p>Click the link to reset the password
            <a href = "http://localhost:8080/reset/${token}">Reset Here</a></p>.`,
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  });
};

exports.getVerifyToken = (req, res, next) => {
  const token = req.params.token;
  User.findOne({ resetToken: token })
    .then((user) => {
      if (!user) {
        const error = new Error("User with email does not exist");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).send(user._id.toString());
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postResetNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;
  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId,
  })
    .then((user) => {
      if (!user) {
        const error = new Error("User with email does not exist");
        error.statusCode = 404;
        throw error;
      }
      resetUser = user;
      return bcrypt.hash(newPassword, 13);
    })
    .then((hashedPasswd) => {
      resetUser.password = hashedPasswd;
      resetUser.resetToken = null;
      resetUser.resetTokenExpiration = null;
      return resetUser.save();
    })
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
