import { Request, Response } from 'express';
import Expense from '../models/expenses.model';
import Budget from '../models/budgets.model';
import Category from '../models/category.model';


export const monthlyReport = async (req: Request, res: Response) => {
const month = req.query.month as string;
if (!month) return res.status(400).json({ message: 'month query param required (e.g., 2025-06)' });


const start = new Date(`${month}-01T00:00:00.000Z`);
const parts = month.split('-');
const year = Number(parts[0]);
const mon = Number(parts[1]);
const end = new Date(Date.UTC(year, mon, 1));


// aggregate spent per category
const spentAgg = await Expense.aggregate([
{ $match: { date: { $gte: start, $lt: end } } },
{ $group: { _id: '$category', spent: { $sum: '$amount' } } }
]);


// get budgets for month
const budgets = await Budget.find({ month }).populate('category');


// get all categories referenced (either in budgets or expenses)
const categoryIds = new Set<string>();
spentAgg.forEach(s => categoryIds.add(String(s._id)));
budgets.forEach(b => categoryIds.add(String(b.categoryId)));


const categories = await Category.find({ _id: { $in: Array.from(categoryIds) } });
const categoriesMap = new Map(categories.map(c => [String(c._id), c]));


const result = Array.from(categoryIds).map(id => {
const spentRow = spentAgg.find(s => String(s._id) === id);
const budgetRow = budgets.find(b => String(b.categoryId) === id);
const cat = categoriesMap.get(id);
const spent = spentRow ? spentRow.spent : 0;
const limit = budgetRow ? budgetRow.limit : null;
const remaining = limit == null ? null : limit - spent;
return {
category: cat ? { id: cat._id, name: cat.name, color: cat.color } : { id, name: 'Unknown' },
spent,
budget: limit,
remaining
};
});


res.json(result);
};