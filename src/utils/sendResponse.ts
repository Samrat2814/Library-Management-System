import { Response } from 'express';

export const sendResponse = <T>(res: Response, data: {
  success: boolean;
  message: string;
  data: T;
}) => {
  res.status(200).json(data);
};
