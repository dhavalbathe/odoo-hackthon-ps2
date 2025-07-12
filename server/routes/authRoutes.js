const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { register, login } = require('../controller/authContoller.js');
const validate = require('../middleware/validate');

router.post(
  '/register',
  [
    body('username').notEmpty().withMessage('Username required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Min 6 char password'),
  ],
  validate,
  register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').exists().withMessage('Password required'),
  ],
  validate,
  login
);

module.exports = router;
