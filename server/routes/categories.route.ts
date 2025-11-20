import { Router } from 'express';
import * as category from '../controllers/categories.controller';
import { authenticate } from '../middlewares/auth';



const router = Router();
router.get('/',authenticate, category.listCategories);
router.post('/',authenticate, category.createCategory);
router.put('/:id',authenticate, category.updateCategory);
router.delete('/:id',authenticate, category.deleteCategory);
export default router;