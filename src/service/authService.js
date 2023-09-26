require("dotenv").config();
const apiRequests = require("../clients/ocdaRequests");
const userRepository = require("../repositories/user");
const authRepository = require("../repositories/auth");
const authlModel = require("../model/Auth");

exports.auth = async function (userData) {
  try {
    let response;
    let authInOcda = await apiRequests.authInOcda(userData);
    if (!authInOcda.logged) throw authInOcda;
    const user = await authlModel.findOne({ code: params.username });
    if (user) response = {token: await authRepository.updateToken(user)};
    else {
      console.log("usuario existente pero sin data");
      response = "usuario existente pero sin data";
    }
    return response;
  } catch (error) {
    console.log("Error al iniciar sesion: ", error);
    return error;
  }
};

exports.saveUser = async function (user) {

};
