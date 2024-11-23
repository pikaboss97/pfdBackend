const userService = require("../service/userService");

exports.updateUserData = async function (req, res) {
  try {
    let userData = req.body;
    const response = await userService.saveUserAcademicData(userData);
    console.log(userData);
    res.status(200).send({ status: true, msg: "success", data: userData});
  } catch (error) {
    res.status(500).send(error);
  }
};