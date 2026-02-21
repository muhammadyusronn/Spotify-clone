import { clerkClient } from "@clerk/express";

export const protectedRoute = async (req, res, next) => {
  try {
    const { userId } = req.auth;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - you must be logged in",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const requireAdmin = async (req, res, next) => {
  try {
    const { userId } = req.auth;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - you must be logged in",
      });
    }
    const user = await clerkClient.users.getUser(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isAdmin =
      process.env.ADMIN_EMAIL == user.primaryEmailAddress?.emailAddress;
    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Forbidden - you do not have admin privileges",
      });
    }
    next();
  } catch (error) {
    console.log("Error in requireAdmin middleware:", error);
    next(error);
  }
};
