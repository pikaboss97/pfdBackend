const crypto = require("crypto");
const authlModel = require("../model/Auth");
require("dotenv").config();

exports.saveToken = async function (user) {};
exports.updateToken = async function (user) {
  try {
    let newToken = this.generateToken(user);
    const responseData = await authlModel.findByIdAndUpdate({userId: user.userId}, {userToken: newToken});
  } catch (error) {
    return error;
  }
};

exports.generateToken = async function () {
  let payload = user.nombre + user.codigo;
  const md5Hasher = crypto.createHmac("md5", process.env.KEY);
  return md5Hasher.update(payload).digest("hex");
};
