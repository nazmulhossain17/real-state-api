// types.d.ts
import { Request as ExpressRequest } from "express";

export type CustomRequest = ExpressRequest & {
  user?: {
    id: string;
    role: string;
  };
};
