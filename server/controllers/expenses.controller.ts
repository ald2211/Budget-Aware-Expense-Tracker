import { NextFunction, Request, Response } from "express";

import Expense from "../models/expenses.model";
import Budget from "../models/budgets.model";
import Category from "../models/category.model";
import { errorHandler } from "../utils/customError";
import mongoose from "mongoose";

// export const listExpenses = async (req: Request, res: Response) => {
//   const userId = (req as any).user.id;
//   const month = req.query.month as string;

//   const [year, mon] = month.split("-").map(Number);
//   const start = new Date(`${month}-01T00:00:00.000Z`);
//   const end = new Date(Date.UTC(year, mon, 1));

//   const expenses = await Expense.find({
//     user: userId,
//     date: { $gte: start, $lt: end },
//   });

//   res.json({ expenses });
// };

export const createExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId, amount, date } = req.body;
    const userId = (req as any).user.id;

    const expenseDate = date ? new Date(date) : new Date();

    // Save expense
    await Expense.create({
      userId: userId,
      categoryId: categoryId,
      amount,
      date: expenseDate,
    });

    // Month substring YYYY-MM
    const month = expenseDate.toISOString().slice(0, 7);
    const [year, mon] = month.split("-").map(Number);

    const start = new Date(`${month}-01T00:00:00.000Z`);
    const end = new Date(Date.UTC(year, mon, 1));

    // Total spent for this category + month
    const spentAgg = await Expense.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(String(userId)),
          categoryId: new mongoose.Types.ObjectId(String(categoryId)),
          date: { $gte: start, $lt: end },
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const spent = spentAgg[0]?.total ?? 0;

    // Fetch budget
    const budget = await Budget.findOne({
       userId,
      categoryId,
      month,
    });

    let status: "no_budget" | "within_budget" | "over_budget";

    if (!budget) {
      status = "no_budget";
    } else if (spent > budget.limit) {
      status = "over_budget";
    } else {
      status = "within_budget";
    }

    // Return ONLY the status
    return res.status(201).json({ success:true,status });
  } catch (err) {
    console.log("create expense error:", err);
    next(errorHandler(500, "internal server error"));
  }
};

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const month = req.query.month as string;

    if (!month) {
      return res.status(400).json({ message: "Month is required" });
    }

    const [year, mon] = month.split("-").map(Number);
    const start = new Date(`${month}-01T00:00:00.000Z`);
    const end = new Date(Date.UTC(year, mon, 1));

    // 1️⃣ Get all categories of this user
    const categories = await Category.find({ userId });

    const summary = [];

    for (const category of categories) {
      // 2️⃣ Get monthly spent for each category
      const spentAgg = await Expense.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(String(userId)),
            categoryId:new mongoose.Types.ObjectId(String(category._id)) ,
            date: { $gte: start, $lt: end },
          },
        },
        { $group: { _id: "$categoryId", total: { $sum: "$amount" } } },
      ]);

      const spent = spentAgg[0]?.total ?? 0;

      // 3️⃣ Get budget for each category
      const budget = await Budget.findOne({
         userId,
        categoryId: category._id,
        month,
      });

      const limit = budget?.limit ?? null;
      const remaining = limit == null ? 0 : limit - spent;

      // 4️⃣ Determine status
      const status =
        limit == null
          ? "no_budget"
          : remaining < 0
          ? "over_budget"
          : "within_budget";

      // 5️⃣ Push summary item
      summary.push({
        category: {
          id: category._id,
          name: category.name,
          color: category.color,
        },
        spent,
        limit,
        remaining,
        status,
      });
    }
    console.log("d:", summary);
    return res.json({ success: true, dashboardData: summary });
  } catch (error) {
    console.error("getExpenseSummary error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
