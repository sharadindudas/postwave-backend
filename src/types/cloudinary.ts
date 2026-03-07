import { type UploadApiOptions } from "cloudinary";

export interface UploadOptions {
  folder: UploadApiOptions["folder"];
  resourceType?: UploadApiOptions["resource_type"];
  publicId?: UploadApiOptions["public_id"];
  transformation?: UploadApiOptions["transformation"];
}

export interface CloudinaryUploadResult {
  url: string;
  publicId?: UploadApiOptions["public_id"];
  resourceType: UploadApiOptions["resource_type"];
  format: string;
  bytes: number;
  width?: number;
  height?: number;
  duration?: number;
}
