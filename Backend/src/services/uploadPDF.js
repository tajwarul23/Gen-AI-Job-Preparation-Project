// ✅ Fixed
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (buffer, options) => {
  try {
    return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
  } catch (error) {
    return error.message
  }
};

const uploadPDF = async (pdfBuffer, thumbnailBuffer, fullName) => {
  const sanitizedName = fullName
    ? fullName?.trim()?.toLowerCase()?.replace(/\s+/g, "_")
    : "resume";
  const publicId = `${sanitizedName}_${Date.now()}`;

  // upload PDF
  const uploadedPDF = await uploadToCloudinary(pdfBuffer, {
    folder: "resumes",
    resource_type: "raw",
    public_id: publicId,
  });

  // upload thumbnail
  const uploadedThumbnail = await uploadToCloudinary(thumbnailBuffer, {
    folder: "resumes/thumbnails",
    resource_type: "image",
    public_id: `${publicId}_thumb`,
    format: "jpg",
  });

  return {
    resumeUrl: uploadedPDF.secure_url,
    publicId: uploadedPDF.public_id,
    thumbnailUrl: uploadedThumbnail.secure_url,      
    thumbnailPublicId: uploadedThumbnail.public_id,  
  };
};

export default uploadPDF;
