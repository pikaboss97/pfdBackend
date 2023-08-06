const authService = require('../service/authService');

exports.auth = async function (req, res) {

    try {
        let userData = req.body;
        let data = await authService.auth(userData);
        res.status(201).send(data);
        
    } catch (error) {
        res.status(401).send(error);
    }

}