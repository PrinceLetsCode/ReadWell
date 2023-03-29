/**
 * @description This file contains all the routes for the application
 * @requires express - The express module
  */



// import required modules
const express = require('express');
const router = express.Router();


// import required controllers
const signUp = require('../controllers/auth/signUp');
const logIn = require('../controllers/auth/logIn');

const getUser = require('../controllers/auth/getUser');

const verifyEmail = require('../controllers/auth/verifyEmail');
const forgotPassword = require('../controllers/auth/forgotPassword');

const updateUsername = require('../controllers/auth/updateUsername');
const updateEmail = require('../controllers/auth/updateEmail');
const updatePhone = require('../controllers/auth/updatePhone');
const updatePassword = require('../controllers/auth/updatePassword');

const addBook = require('../controllers/addBook');
const addToFavourites = require('../controllers/addToFavourites');
const addToOngoing = require('../controllers/addToOngoing');
const addToCompleted = require('../controllers/addToCompleted');

const getAllBooks = require('../controllers/getAllBooks');
const getOngoingBooks = require('../controllers/getOngoingBooks');
const getCompletedBooks = require('../controllers/getCompletedBooks');
const getFavouriteBooks = require('../controllers/getFavouriteBooks');

const deleteFromAll = require('../controllers/deleteFromAll');
const deleteFromOngoing = require('../controllers/deleteFromOngoing');
const deleteFromFavourite = require('../controllers/deleteFromFavourite');
const deleteFromCompleted = require('../controllers/deleteFromCompleted');

const deleteAccount = require('../controllers/auth/deleteAccount');





// Routes

router.route('/signup').post(signUp);
router.route('/login').post(logIn);

router.route('/login/forgotPassword').post(forgotPassword);
router.route('/user/settings/updatePassword').post(updatePassword);

router.route('/user/getUser').post(getUser);

router.route('/user/verifyEmail').post(verifyEmail);

router.route('/user/settings/updateUsername').post(updateUsername);
router.route('/user/settings/updateEmail').post(updateEmail);
router.route('/user/settings/updatePhone').post(updatePhone);

router.route('/user/addBook').post(addBook);
router.route('/user/addToFavourite').post(addToFavourites);
router.route('/user/addToOngoing').post(addToOngoing);
router.route('/user/addToCompleted').post(addToCompleted);

router.route('/:user/allBooks').get(getAllBooks);
router.route('/:user/ongoingBooks').get(getOngoingBooks);
router.route('/:user/completedBooks').get(getCompletedBooks);
router.route('/:user/favouriteBooks').get(getFavouriteBooks);

router.route('/user/allBooks/delete').delete(deleteFromAll);
router.route('/user/ongoingBooks/delete').delete(deleteFromOngoing);
router.route('/user/favouriteBooks/delete').delete(deleteFromFavourite);
router.route('/user/completedBooks/delete').delete(deleteFromCompleted);

router.route('/user/deleteAccount').delete(deleteAccount);


// Export the router
module.exports = router;