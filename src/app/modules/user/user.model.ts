import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

// Define the IUser interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "seller" | "buyer"; // Restrict role to "seller" or "buyer"
  address?: {
    street?: string;
    city?: string;
    state?: string;

    zip?: string;
  };
  comparePassword(password: string): Promise<boolean>; // Method to compare passwords
}

// Define the user schema
const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["seller", "buyer"], // Accept only "seller" or "buyer"
      default: "buyer" // Default role is "buyer"
    },
    address: {
      type: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String }
      }
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt fields
  }
);

// Pre-save middleware to hash password
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err as Error);
  }
});

// Instance method to compare passwords
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

// Export the User model
export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
