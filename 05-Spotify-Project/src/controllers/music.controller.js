import musicModel from "../models/music.model.js";
import albumModel from "../models/album.model.js";
import uploadFile from "../services/storage.service.js";

async function createMusic(req, res) {
  const { title } = req.body;
  const file = req.file;

  const result = await uploadFile(file.buffer.toString("base64"));
  const music = await musicModel.create({
    uri: result.url,
    title,
    artist: req.user.id,
  });

  res.status(201).json({
    success: true,
    message: "Music created successfully",
    music: {
      id: music._id,
      uri: music.uri,
      title: music.title,
      artist: music.artist,
    },
  });
}
async function createAlbum(req, res) {
  const { title, musicIds } = req.body;
  const album = await albumModel.create({
    title,
    musics: musicIds,
    artist: req.user.id,
  });
  return res.status(201).json({
    success: true,
    message: "Created album successfully",
    album: {
      id: album._id,
      title: album.title,
      musics: album.musics,
      artist: album.artist,
    },
  });
}
async function getAllMusics(req, res) {
  const musics = await musicModel
        .find()
        .limit(2)
        .populate("artist", "email username");
  res.status(200).json({
    success: true,
    message: "Sent all musics",
    musics: musics,
  });
}
async function getAllAlbums(req, res) {
  const albums = await albumModel
    .find()
    .select("title artist")
    .populate("artist", "username email");
  res.status(200).json({
    success: true,
    message: "Fetched all albums",
    albums: albums,
  });
}
async function getAlbumById(req, res) {
  const albumId = req.params.albumId;

  const album = await albumModel
    .findOne({ _id: albumId })
    .populate("artist", "username email")
    .populate("musics");

  res.status(200).json({
    success: true,
    message: "Fetched one album",
    album,
  });
}

export { createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById };
