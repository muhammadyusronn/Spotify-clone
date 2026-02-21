import User from "../model/user.model.js";
export const authCallback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;
    // check if the user already exists in the database
    const user = await User.findOne({ clerkId: id });
    if (!user) {
      // if not, create a new user (signup)
      await User.create({
        fullName: `${firstName} ${lastName}`,
        imageUrl,
        clerkId: id,
      });
    }
    // if yes, return the existing user
    res.status(200).json({ success: true, firstName, lastName, imageUrl });
  } catch (error) {
    console.error("Error in auth callback:", error);
    next(error);
  }
};
