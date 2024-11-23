require("dotenv").config();
const jwt = require('jsonwebtoken');
const dicdaRequest = require("../service/dicdaService");
const authlModel = require("../model/Auth");
const userModel = require("../model/User");

exports.auth = async function (userData) {
  try {
    let isNewUser = false;
    let token = "";
    const authInOcda = await dicdaRequest.authInOcda(userData);
    if (!authInOcda.cookie) throw "No se pudo iniciar sesion remota";
    const userAuth = await authlModel.findOne({ userCode: userData.username });
    if (!userAuth){
      isNewUser = true;
      const remoteData = await dicdaRequest.getRemoteStudentData(authInOcda.cookie);
      const [nombres, apellidos] = remoteData.fullName.split(/\s{2,}/);
      const studyPlan = remoteData.studyPlan.match(/\(([^)]+)\)/);
      await authlModel.create({ 
        userName: nombres + ' ' + apellidos, 
        faculty: remoteData.professionalSchool, 
        userCode: userData.username, 
        password: userData.password 
      });
      const newUser = await userModel.create({
        studentCode: userData.username,
        name: nombres,
        lastname: apellidos,
        professionalSchool: remoteData.professionalSchool,
        studyPlan: remoteData.studyPlan,
        studyPlanCode: studyPlan ? studyPlan[1] : null,
        ingressDate: userData.username.slice(2,6),
        personalEmail: remoteData.personalEmail,
        institutionalEmail: remoteData.institutionalEmail,
        studentImage: 'https://academico.unas.edu.pe' + remoteData.studentImage,
        primaryCellphone: remoteData.cellphone1,
        emergencyCellphone: remoteData.cellphone2
      })
      token = jwt.sign({ 
        code: newUser.studentCode,
        name: newUser.name,
        year: newUser.ingressDate, 
        newUser: isNewUser, 
        cookie: authInOcda.cookie
      }, process.env.KEY, {expiresIn: '1d'});
    } else {
        const userDataDb = await userModel.findOne({ studentCode: userData.username });
        if (userAuth.password != userData.password){
          await authlModel.findByIdAndUpdate(userAuth._id,{password: userData.password})
          console.log("Update student password: ",userDataDb.name);
        }
        token = jwt.sign({ 
          code: userDataDb.studentCode, 
          name: userDataDb.name,
          year: userDataDb.ingressDate, 
          newUser: isNewUser, 
          cookie: authInOcda.cookie
        }, process.env.KEY, {expiresIn: '1d'});
    } 
    return { token };
  } catch (error) {
      throw new Error(error.message);
  }
};

