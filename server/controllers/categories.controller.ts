import { Request, Response, NextFunction } from "express";
import Category from "../models/category.model";
import { errorHandler } from "../utils/customError";
import { categorySchema, categoryWithIdSchema } from "../utils/validator";

export const listCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const cats = await Category.find({ userId }).sort({ createdAt: -1 });
    console.log("cats:", cats);
    res.json({ success: true, categories: cats });
  } catch (err: any) {
    console.log(" list category failed", err);
    next(errorHandler(500, "server error"));
  }
};

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, color } = req.body;
    const userId = (req as any).user.id;
    //joi validation
    const { error } = categorySchema.validate(
      {
        name,
        color,
        userId,
      },
      { abortEarly: true }
    );
    if (error) {
      next(errorHandler(400, error.details[0].message));
      return;
    }
    const cat = new Category({ name, color, userId });
    await cat.save();
    res.status(201).json(cat);
  } catch (err: any) {
    console.log(" create category failed", err);
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      next(errorHandler(400, `${field} already exists`));
    }
    next(errorHandler(500, "server error"));
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, color } = req.body;
    //joi validation
    const { error } = categoryWithIdSchema.validate(
      {
        id,
        name,
        color,
      },
      { abortEarly: true }
    );
    if (error) {
      next(errorHandler(400, error.details[0].message));
      return;
    }
    const cat = await Category.findByIdAndUpdate(
      id,
      { name, color },
      { new: true }
    );
    if (!cat) {
      next(errorHandler(404, "Category not found"));
      return;
    }

    res.json(cat);
  } catch (err: any) {
    console.log("update category error", err.message);
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      next(errorHandler(400, `${field} already exists`));
    }
    next(errorHandler(500, "server error"));
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err: any) {
    console.log("delete category error", err.message);
    next(errorHandler(500, "server error"));
  }
};
