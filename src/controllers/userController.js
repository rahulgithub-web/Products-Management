const userModel = require("../models/userModel");
const { uploadFile } = require("../aws/awsUpload");
const validation = require("../validator/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let { isEmpty, isValidName, isValidPhone, isValidPassword, isValidPinCode } =
  validation;

// ========> User Create Api <=================
const createUser = async function (req, res) {
  try {
    let data = req.body;
    let profileImage = req.files;
    console.log(profileImage);
    if (Object.keys(data).length == 0) {
      res
        .status(400)
        .send({ status: "false", message: "All fields are mandatory" });
    }

    let { fName, lName, email, phone, password, address } = data;

    if (!isEmpty(fName)) {
      res
        .status(400)
        .send({ status: "false", message: "fName must be present" });
    }
    if (!isEmpty(lName)) {
      res
        .status(400)
        .send({ status: "false", message: "lName must be present" });
    }
    if (!isEmpty(email)) {
      res
        .status(400)
        .send({ status: "false", message: "email must be present" });
    }
    if (!isEmpty(phone)) {
      res
        .status(400)
        .send({ status: "false", message: "phone number must be present" });
    }
    if (!isEmpty(password)) {
      res
        .status(400)
        .send({ status: "false", message: "password must be present" });
    }
    if (!isEmpty(address)) {
      res
        .status(400)
        .send({ status: "false", message: "Address must be present" });
    }
    if (!isValidName(lName)) {
      res.status(400).send({
        status: "false",
        message: "lName must be in alphabetical order",
      });
    }
    if (!isValidPhone(phone)) {
      res
        .status(400)
        .send({ status: "false", message: "Provide a valid phone number" });
    }
    if (!isValidPassword(password)) {
      res
        .status(400)
        .send({ status: "false", message: "Provide a valid password" });
    }
    if (!isValidName(fName)) {
      res.status(400).send({
        status: "false",
        message: "fName must be in alphabetical order",
      });
    }

    // ------- Address Validation  --------
    if (address) {
      data.address = JSON.parse(address);
      if (address.shipping) {
        // let { street, city, pinCode } = address.shipping;
        if (!isEmpty(address.shipping.street)) {
          res
            .status(400)
            .send({ status: "false", message: "street must be present" });
        }
        if (!isEmpty(address.shipping.city)) {
          res
            .status(400)
            .send({ status: "false", message: "city must be present" });
        }
        if (!isEmpty(address.shipping.pinCode)) {
          res
            .status(400)
            .send({ status: "false", message: "pinCode must be present" });
        }
        if (!isValidName(address.shipping.street)) {
          res.status(400).send({
            status: "false",
            message: "street should be in alphabetical order",
          });
        }
        if (!isValidName(address.shipping.city)) {
          res.status(400).send({
            status: "false",
            message: "city should be in alphabetical order",
          });
        }
        if (!isValidPinCode(address.shipping.pinCode)) {
          res.status(400).send({
            status: "false",
            message: "pinCode should be digits only",
          });
        }
      }
      if (address.billing) {
        // let { street, city, pinCode } = address.billing;
        if (!isEmpty(address.billing.street)) {
          res
            .status(400)
            .send({ status: "false", message: "street must be present" });
        }
        if (!isEmpty(address.billing.city)) {
          res
            .status(400)
            .send({ status: "false", message: "city must be present" });
        }
        if (!isEmpty(address.billing.pinCode)) {
          res
            .status(400)
            .send({ status: "false", message: "pinCode must be present" });
        }
        if (!isValidName(address.billing.street)) {
          res.status(400).send({
            status: "false",
            message: "street should be in alphabetical order",
          });
        }
        if (!isValidName(address.billing.city)) {
          res.status(400).send({
            status: "false",
            message: "city should be in alphabetical order",
          });
        }
        if (!isValidPinCode(address.billing.pinCode)) {
          res.status(400).send({
            status: "false",
            message: "pinCode should be digits only",
          });
        }
      }
    }
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    data.password = hash;

    let checkEmail = await userModel.findOne({ email: email });
    if (checkEmail) {
      res
        .status(400)
        .send({ status: "false", message: "Email is already in use" });
    }
    let checkPhone = await userModel.findOne({ phone: phone });
    if (checkPhone) {
      res
        .status(400)
        .send({ status: "false", message: "Phone number is already in use" });
    }
    if (profileImage && profileImage.length > 0) {
      let uploadFileURL = await uploadFile(profileImage[0]);
      console.log(uploadFileURL);
      data.profileImage = uploadFileURL;
    } else {
      return res.status(400).send({ status: false, msg: "No file found" });
    }
    let savedUser = await userModel.create(data);
    res.status(201).send({
      status: true,
      message: "user has been created successfully",
      data: savedUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ status: "false", msg: err.message });
  }
};

// ==========> User Login Api <================

const userLogin = async function (req, res) {
  try {
    let data = req.body;
    let { email, password } = data;

    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "All fields are mandatory" });
    }
    if (!email) {
      return res
        .status(400)
        .send({ status: false, message: "Email must be present" });
    }
    if (!password) {
      return res
        .status(400)
        .send({ status: false, message: "Password must be present" });
    }

    let checkEmail = await userModel.findOne({
      email: email,
    });
    if (!checkEmail) {
      return res
        .status(401)
        .send({ status: false, message: "Email is incorrect please provide a valid Email" });
    }
    let checkPassword = await bcrypt.compare(password, checkEmail.password);
    
    if(!checkPassword) {
      return res.status(401).send({ status: false, message: "Password is incorrect please provide a valid password"})
    }
    let token = jwt.sign(
      {
        userId: checkEmail._id.toString(),
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, //expires in 24 hr
      },
      "group1Project5"
    );
    res.setHeader("x-api-key", token);  
    res.status(200).send({
      status: true,
      message: "User Login Successful",
      data: { userId: checkEmail._id, token: token },
    });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports = { createUser, userLogin };
