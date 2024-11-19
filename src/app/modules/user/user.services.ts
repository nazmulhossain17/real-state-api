import { config } from "../../config";
import { IUser, User } from "./user.model";
import jwt from "jsonwebtoken";
// Create a new user
async function createUser(userData: Partial<IUser>): Promise<IUser> {
  const user = new User(userData);
  return user.save();
}

// Get all users
async function getAllUsers(): Promise<IUser[]> {
  return User.find();
}

async function loginUser(
  email: string,
  password: string
): Promise<{ user: IUser; token: string } | null> {
  const user = await User.findOne({ email });
  if (!user) {
    return null; // User not found
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return null; // Invalid password
  }

  // Generate JWT
  const token = jwt.sign(
    { id: user._id, role: user.role },
    config.secretToken as string,
    {
      expiresIn: "1h",
    }
  );

  return { user, token };
}

// Get user by ID
async function getUserById(userId: string): Promise<IUser | null> {
  return User.findById(userId);
}

// Update a user by ID
async function updateUser(
  userId: string,
  updateData: Partial<IUser>
): Promise<IUser | null> {
  return User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  });
}

// Delete a user by ID
async function deleteUser(userId: string): Promise<IUser | null> {
  return User.findByIdAndDelete(userId);
}

export const UserService = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
};
