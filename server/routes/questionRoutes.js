const express = require('express');
const { body } = require('express-validator');
const {
  createQuestion,
  getAllQuestions,
  getQuestionById,
} = require('../controller/questionController');
const authenticateUser = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');

const router = express.Router();

const questionValidators = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('tags').isArray().withMessage('Tags must be an array'),
];

router.post('/', authenticateUser, ...questionValidators, validate, createQuestion);
router.get('/', getAllQuestions);
router.get('/:id', getQuestionById);

module.exports = router;
