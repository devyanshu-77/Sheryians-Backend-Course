import ImageKit from "@imagekit/nodejs";

const IMAGEKIT_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY;

const imagekit = new ImageKit({
    privateKey: IMAGEKIT_PRIVATE_KEY,
})


async function uploadFile(buffer) {
    const result = imagekit.files.upload({
        file: buffer.toString("base64"),
        fileName: "image.jpg",
    })
    return result;
}



export default uploadFile;
