const express = require('express');
const router = express.Router();

const signUp = require('../controllers/signUp');
const verifyEmail = require('../controllers/verifyEmail');
const logIn = require('../controllers/logIn');
const home = require('../controllers/home');
const updateInfo = require('../controllers/updateInfo');
const forgotPassword = require('../controllers/forgotPassword');
const getUser = require('../controllers/getUser');
const updateUsername = require('../controllers/updateUsername');
const updateEmail = require('../controllers/updateEmail');
const updatePhone = require('../controllers/updatePhone');
const updatePassword = require('../controllers/updatePassword');

router.route('/home').get((req, res) => {
	res.status(200).send({ message: "reached home" });
})


// * DONE
router.route('/signup').post(signUp);
router.route('/login').post(logIn);
router.route('/login/forgotPassword').post(forgotPassword);
router.route('/user/getUser').post(getUser);
router.route('/user/settings/updateUsername').post(updateUsername);
router.route('/user/settings/updateEmail').post(updateEmail);
router.route('/user/settings/updatePhone').post(updatePhone);
router.route('/user/settings/updatePassword').post(updatePassword);
router.route('/user/verifyEmail').post(verifyEmail);
// ! TO BE DONE
router.route('/updateinfo').post(updateInfo);


module.exports = router;