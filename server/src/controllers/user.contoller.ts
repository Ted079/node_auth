import type { Request, Response } from "express";
import {
  AuthResponse,
  IUpdateUser,
  IUser,
  LoginDTO,
  RegisterDTO,
} from "../../../shared/types/user.types.js";
import {
  loginSchema,
  signupSchema,
  type SignupFormData,
} from "../../../shared/validators/auth.validators.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Registration failed",
        errors: result.error.issues,
      });
    }
    const { email, name, password }: RegisterDTO = result.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Registration failed. Please check your data" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      name,
      password: hashedPass,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    const response: AuthResponse = {
      token,
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        createdAt: user.createdAt,
        // location: user.location,
      },
    };
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Invalid credentials",
        errors: result.error.issues,
      });
    }
    const { email, password }: LoginDTO = result.data;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },

      process.env.JWT_SECRET!,

      { expiresIn: "7d" },
    );

    const response: AuthResponse = {
      token,
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        createdAt: user.createdAt,
        // location: user.location,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId).select("-password"); ///

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


