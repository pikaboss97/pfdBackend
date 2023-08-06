const userModel = require("../model/User");


module.exports.getuserDataAndRecordByUserId = async function (userId) {
  try {
    const userInfo = await userModel.aggregate([
      {
        $lookup: {
          from: "record",
          localField: "idRecord",
          foreignField: "_id",
          as: "academicInfo",
        },
      },
      {
        $lookup: {
          from: "curricula",
          localField: "idCurricula",
          foreignField: "_id",
          as: "mallaInfo",
        },
      },
      { $match: { _id: userId } },
    ]);

    return userInfo;
  } catch (error) {
    console.log("Error al consultar la informacion de Mongo: ", error);
    return error;
  }
};

module.exports.getUserrById = async function (userId) {
  try {
    return await userModel.findOne({"_id": userId})
  } catch (error) {
    return error
  }
}
