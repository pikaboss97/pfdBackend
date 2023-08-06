require("dotenv").config();
const apiRequests = require("../clients/ocdaRequests");
const userRepository = require("../repositories/user");
const authRepository = require("../repositories/auth");
const authlModel = require("../model/Auth");

exports.auth = async function (userData) {
  try {
    let response;
    let authInOcda = await apiRequests.authInOcda(userData);
    if (authInOcda == "API_AUTH_ERROR") throw authInOcda;
    const user = await authlModel.findOne({ code: params.username });
    if (user) {
      const userInfo = await userRepository.getuserDataById(user.userId);
      response = {
        token: await authRepository.updateToken(user),
      };
    } else {

    }

    return response;
  } catch (error) {
    console.log("Error al iniciar sesion: ", error);
    return error;
  }
};

exports.saveUser = async function (user) {};
