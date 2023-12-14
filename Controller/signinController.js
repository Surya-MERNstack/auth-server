const User = require("../Models/User");
const VerifyUser = require("../Models/VerifyUser");
const { sendMail } = require("../Controller/SendMail");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

async function InsertSignUpUser(token) {
  try {
    const userVerify = await VerifyUser.findOne({ token: token });
    if (userVerify) {
      const newUser = new User({
        name: userVerify.name,
        email: userVerify.email,
        password: userVerify.password,
        about: "",
        tags: [],
        forgetPassword: {},
      });
      await newUser.save();
      await userVerify.deleteOne({ token: token });
      const content = `
  <h4>Hi there,</h4>
  <h5>Welcome to Stack OverFlow Clone</h5>
  <p>Your account has been successfully registered in Stack OverFlow clone</p>
  <p>Click below link to login into your account.</p>
  <a href="https://stack-overflow-clone-praveenraj.netlify.app/">https://stack-overflow-clone-praveenraj.netlify.app/</a>
  <p>Regards,</p>
  <p>Stack OverFlow Clone</p>
  `;
      sendMail(
        newUser.email,
        "Stack OverFlow Clone - Registration Successful",
        content
      );
      return `
      <html>
        <head>
          <title>Registration Successful</title>
        </head>
        <body>
          <h1>Registration Successful</h1>
          <p>Your account has been successfully registered in swiggy clone.</p>
          <p>Click below link to login into your account.</p>
          <a href="https://stack-overflow-clone-praveenraj.netlify.app/">https://stack-overflow-clone-praveenraj.netlify.app/</a>
        </body>
      </html>`;
    }
    return `<html>
    <head>
      <title>Registration Failed</title>
    </head>
    <body>
      <h1>Registration Failed</h1>
      <p>Link Expired...</p>
    </body>
  </html>`;
  } catch (error) {
    console.log(error);
    return `<html>
    <head>
      <title>Registration Failed</title>
    </head>
    <body>
      <h1>Registration Failed</h1>
      <p>Unexpected error happend, Please sign in again</p>
    </body>
  </html>`;
  }
}

async function InsertVerifyUser(name, email, password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    token = generateToken(email);
    const newUser = new VerifyUser({
      name: name,
      email: email,
      password: hashedPassword,
      token: token,
    });
    const activationLink = `https://stack-overflow-clone-j3nr.onrender.com/signin/${token}`;
    const content = `
        <h4>Hi there,</h4>
        <h5>Welcome to Stack OverFlow Clone</h5>
        <p>Thank you for signing up. Please click the link below to activate your account:</p>
        <a href="${activationLink}">${activationLink}</a>
        <p>Regards,</p>
        <p>Stack OverFlow Clone</p>
        `;

    await newUser.save();
    sendMail(email, "Stack OverFlow Clone - Verify User", content);
  } catch (error) {
    console.error(error);
  }
}

function generateToken(email) {
  const token = jwt.sign(email, process.env.signup_Secret_Token);
  return token;
}

module.exports = { InsertSignUpUser, InsertVerifyUser };
