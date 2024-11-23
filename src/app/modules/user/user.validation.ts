import { z } from "zod";

// User creation schema
const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    role: z.enum(["seller", "buyer"]).optional().default("buyer")
  })
});

// User login schema
const loginUserSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required")
  })
});

// User update schema
const updateUserSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters long")
      .optional(),
    email: z.string().email("Invalid email address").optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .optional()
  })
});

export const UserValidation = {
  createUserSchema,
  loginUserSchema,
  updateUserSchema
};
