import ImageKit from "@imagekit/nodejs";
const IMAGEKIT_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY;

const ImageKitClient = new ImageKit({
  privateKey: IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(file) {
  const result = await ImageKitClient.files.upload({
    file,
    fileName: "music_" + Date.now(),
    folder: "yt-complete-backend/music",
  });

  return result;
}

export default uploadFile;
