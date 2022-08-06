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

// pincode Validation
const isValidpincode = function (pincode) {
  const pincodeRegex = /^[1-9][0-9]{6}$/;
  return pincodeRegex.test(pincode);
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

const isValidImage = function (profileImage) {
  let imageRegex = /^\\s]+(\\.(?i)(jpe?g|png|gif|bmp))$/;
  return imageRegex.test(profileImage);
}

const isValidSize = function(size) {
  let sizes = ["S", "XS", "M", "X", "L", "XXL", "XL"];
  return sizes.includes(size);
}

const isValidInstallment = function (installment) {
  let numberRegex = /^([-]?|[1-9][0-9]*)$/
  return numberRegex.test(installment)
}

const isValidPrice = function (price) {
  let priceRegex = /^([0-9]{0,2}((.)[0-9]{0,2}))$/
  return priceRegex.test(price)
}

const isValidStatus = function (status) {
  let state = ['pending','completed','cancelled'];
  return state.includes(status);
}

const isValidStreet = function (street) {
  let streets = /^[A-Za-z0-9'\.\-\s\,]$/
  return streets.test(street);
}

module.exports = {
  isEmpty,
  isValidName,
  isValidEmail,
  isValidPhone,
  isValidPassword,
  isValidpincode,
  isValidObjectId,
  isValidImage,
  isValidInstallment,
  isValidSize,
  isValidPrice,
  isValidStatus,
  isValidStreet
};