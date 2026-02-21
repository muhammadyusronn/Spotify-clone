import Song from "../model/song.model.js";
import Album from "../model/album.model.js";
import cloudinary from "../lib/cloudinary.js";

// helper function to upload files to cloudinary
const uploadToCloudinary = async (files) => {
  try {
    const result = await cloudinary.uploader.upload(files.tempFilePath, {
      resource_type: "auto",
      folder: "spotify-clone",
    });
    return result.secure_url;
  } catch (error) {
    console.log("Error in upload to cloudinary", error);
    throw new Error("Failed to upload files to cloudinary");
  }
};

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audio || !req.files.image) {
      return res.status(400).json({
        success: false,
        message: "Audio and image files are required",
      });
    }

    const { title, artist, album, duration, albumId } = req.body;
    const audioFile = req.files.audio;
    const imageFile = req.files.image;

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null,
    });
    await song.save();

    // if song belongs to an album, add the song reference to the album's song array
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, { $push: { song: song._id } });
    }
    return res.status(201).json({
      success: true,
      message: "Song created successfully",
      song,
    });
  } catch (error) {
    console.error("Error creating song:", error);
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await Song.findByIdAndDelete(id);
    if (!song) {
      return res
        .status(404)
        .json({ success: false, message: "Song not found" });
    }
    // if the song belongs to  an album, remove the song reference from the album's song array
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { song: song._id },
      });
    }
    return res.status(200).json({
      success: true,
      message: "Song deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting song:", error);
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    const { title, artist, releaseYear } = req.body;
    const imageFile = req.files.image;

    const imageUrl = await uploadToCloudinary(imageFile);

    const album = new Album({
      title,
      artist,
      releaseYear,
      imageUrl,
    });
    await album.save();

    return res.status(201).json({
      success: true,
      message: "Album created successfully",
      album,
    });
  } catch (error) {
    console.error("Error creating album:", error);
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  const { id } = req.params;
  try {
    const album = await Album.findByIdAndDelete(id);
    if (!album) {
      return res
        .status(404)
        .json({ success: false, message: "Album not found" });
    }
    // delete all songs that belong to the deleted album
    await Song.deleteMany({ albumId: id });
    return res.status(200).json({
      success: true,
      message: "Album and its songs deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting album:", error);
    next(error);
  }
};

export const checkAdmin = async (req, res, next) => {
  return res.status(200).json({
    success: true,
    admin: true,
    message: "Admin access granted",
  });
};
