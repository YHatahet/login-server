"use strict";

const express = require("express");
const router = express.Router();

/**
 * WIP:
 *
 * Middleware that checks if the user is authorized to use a given API
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {void} `void`
 */
const isAllowed = (req, res, next) => {
  const email = req?.session?.email;
  if (email) {
    return next();
  } else {
    res.end("User is not allowed");
  }
};

router
  /**
   * Get home page
   */
  .get("/", (req, res) => {
    const email = req?.body?.email;
    if (email) {
      res.end(`Home page. Currently logged in with ${email}`);
    } else {
      res.end("Home page. Login to gain more access");
    }
  })
  /**
   * Check if session has admin privileges
   */
  .get("/admin", isAllowed, (req, res) => {
    res.end(`Hello ${req.session.email}`);
  })
  /**
   * Login user and add email to session
   */
  .post("/login", (req, res) => {
    const email = req?.body?.email;
    if (email) {
      req.session.email = email;
      // TODO add email and password checker
      res.end("Login successful");
    } else {
      res.end("Login failed");
    }
  })
  /**
   * Logout user and destroy session
   */
  .get("/logout", isAllowed, (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return console.log(err);
      }
      res.end("logout successful");
    });
  });

module.exports = router;
