import { Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import * as argon from "argon2";
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  // SignUp Method
  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    try {
        // Create a new user along with the address in the database
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: hash,  // Store the hashed password
                name: dto.name,  // Store the user's name
                role: dto.role || 'BUYER',  // Default to 'BUYER' if role isn't provided
                address: {
                    create: {  // Use 'create' for nested object creation
                        street: dto.street,
                        city: dto.city,
                        state: dto.state,
                        zip: dto.zip,
                    },
                },
            },
            include: {
                address: true,  // Include the address in the returned object
            },
        });

        // Return a success message excluding the password
        return {
            msg: "User successfully registered",
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                address: user.address,  // This will now include the address fields
            },
        };
    } catch (error) {
        throw new Error("Error creating user: " + error.message);
    }
}

  // SignIn Method
  async signin(dto: AuthDto) {
    try {
      // Step 1: Find the user by email
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
        include: {
            address: true,  // Include the address field in the query
          },
      });

      // Step 2: Check if user exists
      if (!user) {
        throw new Error("User not found");
      }

      // Step 3: Compare the provided password with the stored hashed password
      const isPasswordValid = await argon.verify(user.password, dto.password);
      if (!isPasswordValid) {
        throw new Error("Invalid credentials");
      }

      // Step 4: Generate JWT token upon successful login
      const token = await this.signToken(user.id, user.email);

      // Return success message along with the token
      return {
        msg: "User successfully signed in",
        token: token,  // Include the generated token
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          address: user.address,
        },
      };
    } catch (error) {
      throw new Error(error.message || "An error occurred during sign-in");
    }
  }

  // JWT token signing method
  async signToken(userId: string, email: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    
    const secret = this.config.get<string>('JWT_SECRET');
    
    // Generate the token
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });
  
    // Return the token directly as a string
    return {
        access_token : token
    };
  }

  // Get User by ID
  async getUserById(userId: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: { address: true },
      });

      if (!user) {
        throw new Error("User not found");
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        address: user.address,
      };
    } catch (error) {
      throw new Error(error.message || "An error occurred while retrieving the user");
    }
  }

  // Update User
  async updateUser(userId: string, dto: Partial<AuthDto>) {
    try {
      // Prevent updates to role and password
      if (dto.role) {
        throw new Error("Role cannot be updated.");
      }
  
      if (dto.password) {
        throw new Error("Password cannot be updated using this method.");
      }
  
      const user = await this.prisma.user.update({
        where: { id: userId },
        data: {
          email: dto.email,
          name: dto.name,
          address: dto.street
            ? {
                update: {
                  street: dto.street,
                  city: dto.city,
                  state: dto.state,
                  zip: dto.zip,
                },
              }
            : undefined,
        },
        include: { address: true },
      });
  
      return {
        msg: "User successfully updated",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role, // Role remains unchanged
          address: user.address,
        },
      };
    } catch (error) {
      throw new Error(error.message || "An error occurred while updating the user");
    }
  }
  // Delete User
  async deleteUser(userId: string) {
    try {
      // Step 1: Check if the user exists
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
  
      if (!user) {
        throw new Error("User not found");
      }
  
      // Step 2: Attempt to delete the associated address (if it exists)
      try {
        await this.prisma.address.delete({
          where: { userId },
        });
      } catch (addressError) {
        console.warn(`No address found for userId: ${userId}`);
      }
  
      // Step 3: Delete the user
      await this.prisma.user.delete({
        where: { id: userId },
      });
  
      return { msg: "User successfully deleted", userId };
    } catch (error) {
      throw new Error(error.message || "An error occurred while deleting the user");
    }
  }
  
}
