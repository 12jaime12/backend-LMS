const Review = require("../models/review.model");
const Taller = require("../models/taller.model");
const User = require("../models/user.model");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

//--------1-----------CREATE REVIEW--------------------------
//-----------------------------------------------------------
const createReview = async (req, res, next) => {};
//--------2-----------DELETE REVIEW--------------------------
//-----------------------------------------------------------
const deleteReview = async (req, res, next) => {};
//--------3-----------MEDIA PUNTUACION-----------------------
//-----------------------------------------------------------
const mediaPuntuacionReview = async (req, res, next) => {};
//--------4-----------GET REVIEW CATALOGO--------------------
//-----------------------------------------------------------
const getReviewCatalogo = async (req, res, next) => {};
//--------5-----------GET REVIEW COCHE-----------------------
//-----------------------------------------------------------
const getReviewCoche = async (req, res, next) => {};
//--------6-----------GET BY DNI-----------------------------
//-----------------------------------------------------------
const getReviewByDni = async (req, res, next) => {};

module.exports = {
  createReview,
  deleteReview,
  mediaPuntuacionReview,
  getReviewByDni,
  getReviewCatalogo,
  getReviewCoche,
};
