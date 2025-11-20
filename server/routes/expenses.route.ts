import { Router } from 'express';
import * as expense from '../controllers/expenses.controller';
import { authenticate } from '../middlewares/auth';



const router = Router();
router.get('/', authenticate, expense.getDashboardData);
router.post('/', authenticate, expense.createExpense);
export default router;