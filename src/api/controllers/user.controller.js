const Review = require("../models/review.model");
const Taller = require("../models/taller.model");
const User = require("../models/user.model");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

//--------1-----------REGISTER USER--------------------------
//-----------------------------------------------------------
const registerUser = async (req, res, next) => {};
//--------2-----------CHECK CODE-----------------------------
//-----------------------------------------------------------
const checkCodeUser = async (req, res, next) => {};
//--------3-----------RESEND CODE----------------------------
//-----------------------------------------------------------
const resendCodeUser = async (req, res, next) => {};
//--------4-----------AUTOLOGIN------------------------------
//-----------------------------------------------------------
const autologinUser = async (req, res, next) => {};
//--------5-----------LOGIN----------------------------------
//-----------------------------------------------------------
const loginUser = async (req, res, next) => {};
//--------6-----------FORGOT PASS----------------------------
//-----------------------------------------------------------
const forgotPasswordUser = async (req, res, next) => {};
//--------7-----------CHANGE PASS----------------------------
//-----------------------------------------------------------
const changePasswordUser = async (req, res, next) => {};
//--------8-----------UPDATE USER----------------------------
//-----------------------------------------------------------
const updateUser = async (req, res, next) => {};
//--------9-----------DELETE USER----------------------------
//-----------------------------------------------------------
const deleteUser = async (req, res, next) => {};
//--------10-----------GET ALL-------------------------------
//-----------------------------------------------------------
const getAllUser = async (req, res, next) => {};
//--------11-----------GET ID--------------------------------
//-----------------------------------------------------------
const getIdUser = async (req, res, next) => {};

module.exports = {
  registerUser,
  checkCodeUser,
  resendCodeUser,
  autologinUser,
  loginUser,
  forgotPasswordUser,
  changePasswordUser,
  updateUser,
  deleteUser,
  getAllUser,
  getIdUser,
};
