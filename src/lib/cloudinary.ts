import { v2 as cloudinary, type UploadApiOptions } from "cloudinary";
import type { CloudinaryUploadResult, UploadOptions } from "../types/cloudinary";
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from "../config";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = async (file: Express.Multer.File, options: UploadOptions): Promise<CloudinaryUploadResult> => {
  const { folder, publicId, transformation, resourceType = "image" } = options;

  const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

  const result = await cloudinary.uploader.upload(base64, {
    folder,
    public_id: publicId,
    overwrite: !!publicId,
    resource_type: resourceType,
    ...(transformation && resourceType !== "raw" ? { transformation } : {})
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    resourceType: result.resource_type as UploadApiOptions["resource_type"],
    format: result.format,
    bytes: result.bytes,
    width: result.width,
    height: result.height,
    duration: result.duration
  };
};

export const deleteFromCloudinary = async (publicId: string, resourceType: UploadApiOptions["resource_type"] = "image"): Promise<void> => {
  await cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType
  });
};
