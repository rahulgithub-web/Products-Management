const mongoose = require('mongoose');

//Name Validation
const isValidName = function (name) {
  const nameRegex = /^[a-zA-Z ]+$/;
  return nameRegex.test(name);
};

//Email Validation
const isValidEmail = function (email) {
  const emailRegex =
    /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
  return emailRegex.test(email);
};

// Password Validation
const isValidPassword = function (password) {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/;
  return passwordRegex.test(password);
};

//Phone Validation
const isValidPhone = function (phone) {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

// pinCode Validation
const isValidPinCode = function (pinCode) {
  const pinCodeRegex = /^[1-9][0-9]{6}$/;
  return pinCodeRegex.test(pinCode);
};

//Value Validation
const isEmpty = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

// ObjectId  
const isValidObjectId = (objectId) => {
  return mongoose.Types.ObjectId.isValid(objectId);
};


module.exports = {
  isEmpty,
  isValidName,
  isValidEmail,
  isValidPhone,
  isValidPassword,
  isValidPinCode,
  isValidObjectId,
};