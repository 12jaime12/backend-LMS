const Review = require("../models/review.model");
const Taller = require("../models/taller.model");
const User = require("../models/user.model");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

//--------1-----------REGISTER TALLER------------------------
//-----------------------------------------------------------
const registerTaller = async (req, res, next) => {};
//--------2-----------CHECK CODE-----------------------------
//-----------------------------------------------------------
const checkCodeTaller = async (req, res, next) => {};
//--------3-----------RESEND CODE----------------------------
//-----------------------------------------------------------
const resendCodeTaller = async (req, res, next) => {};
//--------4-----------AUTOLOGIN------------------------------
//-----------------------------------------------------------
const autologinTaller = async (req, res, next) => {};
//--------5-----------LOGIN----------------------------------
//-----------------------------------------------------------
const loginTaller = async (req, res, next) => {};
//--------6-----------FORGOT PASS----------------------------
//-----------------------------------------------------------
const forgotPasswordTaller = async (req, res, next) => {};
//--------7-----------CHANGE PASS----------------------------
//-----------------------------------------------------------
const changePasswordTaller = async (req, res, next) => {};
//--------8-----------UPDATE USER----------------------------
//-----------------------------------------------------------
const updateTaller = async (req, res, next) => {};
//--------9-----------DELETE USER----------------------------
//-----------------------------------------------------------
const deleteTaller = async (req, res, next) => {};
//--------10-----------GET ALL-------------------------------
//-----------------------------------------------------------
const getAllTaller = async (req, res, next) => {};
//--------11-----------GET ID--------------------------------
//-----------------------------------------------------------
const getIdTaller = async (req, res, next) => {};

module.exports = {
  registerTaller,
  checkCodeTaller,
  resendCodeTaller,
  autologinTaller,
  loginTaller,
  forgotPasswordTaller,
  changePasswordTaller,
  updateTaller,
  deleteTaller,
  getAllTaller,
  getIdTaller,
};
