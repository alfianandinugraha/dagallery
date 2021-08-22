import cloudinarySDK from "cloudinary";

const cloudinaryConfig: cloudinarySDK.ConfigOptions = {
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
}

const cloudinaryBase = cloudinarySDK.v2
cloudinaryBase.config(cloudinaryConfig)

const remove = async (path: string) => {
  return await cloudinaryBase.uploader.destroy(path)
}

const cloudinary = {
  remove
}

export default cloudinary