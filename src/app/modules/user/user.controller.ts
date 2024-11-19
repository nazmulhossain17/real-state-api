import { Request, Response } from "express";
import { UserService } from "./user.services";

// Create a new user
async function createUserHandler(req: Request, res: Response): Promise<void> {
  try {
    const newUser = await UserService.createUser(req.body);
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
}

async function loginUserHandler(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, message: "Email and password are required." });
      return;
    }

    const result = await UserService.loginUser(email, password);
    if (!result) {
      res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Login successful.",
      data: {
        user: result.user,
        token: result.token,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
}

// Get all users
async function getAllUsersHandler(req: Request, res: Response): Promise<void> {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
}

// Get a single user by ID
async function getUserByIdHandler(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.params.id;
    const user = await UserService.getUserById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
}

// Update a user by ID
async function updateUserHandler(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.params.id;
    const updatedUser = await UserService.updateUser(userId, req.body);
    if (!updatedUser) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
}

// Delete a user by ID
async function deleteUserHandler(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.params.id;
    const deletedUser = await UserService.deleteUser(userId);
    if (!deletedUser) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
}

export const UserController = {
  createUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  loginUserHandler,
  updateUserHandler,
  deleteUserHandler,
};
