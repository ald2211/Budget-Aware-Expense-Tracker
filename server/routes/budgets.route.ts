

import { Router } from 'express';
import * as budget from '../controllers/budgets.controller';
import { authenticate } from '../middlewares/auth';



const router = Router();
router.get("/",authenticate, budget.listBudgets);
router.post("/", authenticate, budget.upsertBudget);
router.delete("/:id", authenticate, budget.deleteBudget);

export default router;