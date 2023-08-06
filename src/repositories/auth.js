const crypto = require("crypto");
const authlModel = require("../model/Auth");
require("dotenv").config();


exports.updateToken = async function (user) {
    let payload = user.nombre + user.codigo;
    const md5Hasher = crypto.createHmac("md5", process.env.KEY);
    const responseData = await authlModel.insertOne({
        userId: user.userId,
        userCode: user.codigo,

    })
    return md5Hasher.update(payload).digest("hex");
};