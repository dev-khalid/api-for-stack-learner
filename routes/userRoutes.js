const express = require('express');
const userController = require('../controllers/userControllers');
const authController = require('../controllers/authController');
/**
 * @uSER_Routes
 *  POST    /api/users
 *  GET     /api/users
 *  GET     /api/users/:id
 *  PATCH   /api/users/:id
 *  DELETE  /api/users/:id
 */
const router = express.Router();

/**
 * PUBLIC ROUTES
 */
router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);
router.get('/:id', userController.getSingleUser);
/**
 * AUTHENTICATED USER ROUTES
 */
router.use(authController.protect);
router.route('/').get(userController.getMe);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

/**
 * ADMIN ROUTES
 */

router.use(authController.restrictTo('admin'));
router.route('/getAllUser').get(userController.getAllUser); 
router
  .route('/')
  // .get(userController.getAllUser)
  .post(userController.createUser);
router.route('/:id').patch(userController.updateUser).delete(userController.deleteUser)

module.exports = router;