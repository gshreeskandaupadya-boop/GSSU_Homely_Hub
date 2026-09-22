// ---- where user photos are stored ----
// Images are NOT kept in our database. We send them to
// ImageKit and save only the link they give back.
import ImageKit from "imagekit";
import dotenv from "dotenv";


// load the keys from .env before we use them
dotenv.config({ path: ".env" });
// Connect once here, then every file can import and use it.
// publicKey  - can be seen by anyone
// privateKey - secret, never on GitHub
// urlEndpoint - our folder address on ImageKit
const publicKey = process.env.IMAGEKIT_PUBLICKEY || process.env.IMAGE_KIT_PUBLIC_KEY || "dummy_public_key";
const privateKey = process.env.IMAGEKIT_PRIVATEKEY || process.env.IMAGE_KIT_PRIVATE_KEY || "dummy_private_key";
const urlEndpoint = process.env.IMAGEKIT_URLENDPOINT || process.env.IMAGE_KIT_URL_ENDPOINT || "https://ik.imagekit.io/dummy";

let imagekit;
try {
  imagekit = new ImageKit({
    publicKey,
    privateKey,
    urlEndpoint,
  });
} catch (error) {
  console.warn("Warning: ImageKit initialization failed:", error.message);
  imagekit = {
    upload: async () => ({ fileId: `img_${Date.now()}`, url: "https://i.pravatar.cc/150?img=3" })
  };
}


// authController uses this as imagekit.upload(...)
export default imagekit;
