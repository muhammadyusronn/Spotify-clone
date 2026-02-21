import User from "../model/user.model.js";
export const getAllUsers = async (req, res, next) => {
  try {
    const currentUserId = req.auth.userId; // Get the authenticated user's ID from Clerk
    const users = await User.find({ _id: { $ne: currentUserId } }); // Exclude the authenticated user from the results
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    next(error); // Pass the error to the global error handler
  }
};
