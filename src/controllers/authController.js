import User from "../models/User.js";

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
