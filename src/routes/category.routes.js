import express from 'express';
import * as categoryController from '../controllers/category.controller.js';
import validate from '../middlewares/validate.js';
import { createCategorySchema, updateCategorySchema } from '../validators/category.validator.js';

const router = express.Router();

router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getById);
router.post('/', validate(createCategorySchema), categoryController.create);
router.put('/:id', validate(updateCategorySchema), categoryController.update);
router.delete('/:id', categoryController.remove);

export default router;