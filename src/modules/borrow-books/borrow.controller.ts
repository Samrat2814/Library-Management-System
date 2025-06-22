import { Request, Response, NextFunction } from "express";
import * as BorrowService from "./borrow.service";
import { sendResponse } from "../../utils/sendResponse";

export const createBorrow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const borrow = await BorrowService.createBorrow(req.body);
    sendResponse(res, {
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error) {
    next(error);
  }
};

export const getBorrowSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const summary = await BorrowService.getBorrowSummary();
    sendResponse(res, {
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    next(error);
  }
};
