import { NextFunction, Request, Response } from "express";
import Budget from "../models/budgets.model";
import Category from "../models/category.model";
import { errorHandler } from "../utils/customError";

export const listBudgets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const month = req.query.month as string;
    const userId = (req as any).user.id;
    if (!month) {
      next(errorHandler(400, "month is required"));
      return;
    }

    const budgets = await Budget.find({ userId, month });
    res.json({ success: true, budgets });
  } catch (err: any) {
    console.log("list budget error:", err);
    next(errorHandler(500, "internal server error"));
  }
};

export const upsertBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { month, categoryId, limit } = req.body;
    const userId = (req as any).user.id;

    // Validate category belongs to the same user
    const category = await Category.findOne({ _id: categoryId, userId });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Try to find existing budget for this user
    let budget = await Budget.findOne({ month, categoryId, userId });

    if (budget) {
      // Update existing budget
      budget.limit = limit;
      await budget.save();

      return res.json({
        success: true,
        message: "Budget updated successfully",
        budget,
      });
    }

    // Create new budget
    budget = new Budget({ userId, month, categoryId, limit });
    await budget.save();

    return res.status(201).json({
      success: true,
      message: "Budget created successfully",
      budget,
    });
  } catch (err: any) {
    console.log("error at upsert budget:", err);
    next(errorHandler(500, "internal server error"));
  }
};

export const deleteBudget = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Budget.findByIdAndDelete(id);
  res.status(204).send();
};
