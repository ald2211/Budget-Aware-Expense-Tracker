import { Router } from 'express';
import * as report from '../controllers/reports.controller';



const router = Router();
router.get('/', report.monthlyReport);
export default router;