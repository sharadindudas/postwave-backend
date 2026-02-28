import { v2 as cloudinary } from "cloudinary";
import * as fs from "fs";
import * as path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log("Config:", cloudinary.config());

// Create a tiny test image buffer (1x1 red pixel PNG)
const testImageBuffer = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwADhQGAWjR9awAAAABJRU5ErkJggg==", "base64");

const result = await new Promise((resolve, reject) => {
  cloudinary.uploader
    .upload_stream({ folder: "test" }, (error, uploadResult) => {
      if (error) return reject(error);
      return resolve(uploadResult);
    })
    .end(testImageBuffer);
});

console.log("Upload success:", result);
