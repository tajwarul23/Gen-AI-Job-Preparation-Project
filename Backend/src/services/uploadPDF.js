
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (buffer, options) => {
  
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
   
};

export const uploadPDF = async (pdfBuffer, thumbnailBuffer, fullName) => {
  const sanitizedName = fullName
    ? fullName?.trim()?.toLowerCase()?.replace(/\s+/g, "_")
    : "resume";
  const publicId = `${sanitizedName}_${Date.now()}`;


  const [pdfResult, thumbnailResult] = await Promise.all([
      uploadToCloudinary(pdfBuffer, {
    folder: "resumes",
    resource_type: "raw",
    public_id: publicId,
  }),

  uploadToCloudinary(thumbnailBuffer, {
    folder: "resumes/thumbnails",
    resource_type: "image",
    public_id: `${publicId}_thumb`,
    format: "jpg",
  })

  ])


  return {
    resumeUrl: pdfResult.secure_url,
    publicId: pdfResult.public_id,
    thumbnailUrl: thumbnailResult.secure_url,      
    thumbnailPublicId: thumbnailResult.public_id,  
  };
};

export const uploadCompanyLogo = async(logoBuffer, companyName) =>{
  const sanitizedName = companyName?companyName.trim().toLowerCase().replace(/\s+/g, "_"):"company";
   const publicId = `${sanitizedName}_${Date.now()}`;
  const result = await uploadToCloudinary(logoBuffer,{
    folder: "company-logos",
    resource_type:"image",
    publicId:publicId,
    transformation:[
         {
      width: 400,
      height: 400,
      crop: "limit",
      quality: "auto",
      fetch_format: "auto",
    },
    ]
  })

  return {
    logoUrl: result.secure_url,
    publicId: result.public_id
  }
}
