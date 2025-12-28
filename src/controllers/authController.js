import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!email || !username || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User is already exist" });

    const newUser = {
      email,
      username,
      password,
    };

    const user = await User.create(newUser);

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email }).select("+password");

    if (!existingUser)
      return res.status(404).json({ message: "User is not found" });

    const isMatch = await existingUser.comparePassword(password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    if (!existingUser.password) {
      return res.status(500).json({ message: "Password not found" });
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, 
    });

    return res.status(200).json({
      message: "Login is successfull",
      user: {
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        role: existingUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req,res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, 
    sameSite: "strict",
  })

  return res.status(200).json({message: "Logged out successfully"})
}
