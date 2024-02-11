import { Response } from 'express';

interface APIResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data?: T;
}

export const sendAPIResponse = <T>(res: Response, options: Partial<APIResponse<T>>) => {
  const { success = true, status = 200, message, data } = options;

  res.status(status).json({ success, status, message, data });
};
