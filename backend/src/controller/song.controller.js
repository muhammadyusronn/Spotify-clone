import Song from "../model/song.model.js";

export const getAllSongs = async (req, res, next) => {
  try {
    // Fetch all songs from the database, sorted by creation date (newest to oldest (-1)) for oldest to newest use 1
    const songs = await Song.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: songs,
    });
  } catch (error) {
    next(error);
  }
};

export const getFeaturedSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      { sample: { size: 6 } }, // Randomly select 10 songs from the collection
      { $project: { id: 1, title: 1, artist: 1, imageUrl: 1, audioUrl: 1 } }, // Project only the necessary fields
    ]);
    return res.status(200).json({
      success: true,
      data: songs,
    });
  } catch (error) {
    console.error("Error fetching featured songs:", error);
    next(error);
  }
};
export const getMadeForYouSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      { sample: { size: 4 } }, // Randomly select 10 songs from the collection
      { $project: { id: 1, title: 1, artist: 1, imageUrl: 1, audioUrl: 1 } }, // Project only the necessary fields
    ]);
    return res.status(200).json({
      success: true,
      data: songs,
    });
  } catch (error) {
    console.error("Error fetching featured songs:", error);
    next(error);
  }
};
export const getTrandingSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      { sample: { size: 4 } }, // Randomly select 10 songs from the collection
      { $project: { id: 1, title: 1, artist: 1, imageUrl: 1, audioUrl: 1 } }, // Project only the necessary fields
    ]);
    return res.status(200).json({
      success: true,
      data: songs,
    });
  } catch (error) {
    console.error("Error fetching featured songs:", error);
    next(error);
  }
};
