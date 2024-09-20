const cloudinary = require("cloudinary").v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async(localFilePath, filename) => {
    const SAFE_ROOT = "/path/to/safe/directory";
    try {
        // Normalize the local file path
        const normalizedPath = path.resolve(localFilePath);
        // Check if the normalized path is within the safe root directory
        if (!normalizedPath.startsWith(SAFE_ROOT)) {
            throw new Error("Invalid file path");
        }
        // Aquí le podemos cambiar el nombre a la carpeta de "main", y ponerle
        // un nombre diferente a la carpeta donde queramos subir nuestros archivos
        // a cloudinary
        const folder = "backend-final";
        const filePathOnCloudinary = folder + "/" + path.parse(filename).name; //backend-final
        const result = await cloudinary.uploader.upload( 
            normalizedPath, 
            { "public_id": filePathOnCloudinary }
        )
        return result;
    } catch (error) {
        console.log(error);
        return { message: "Upload to cloudinary failed" };
    } finally {
        fs.unlinkSync(localFilePath)
    }
}

const deleteFromCloudinary = async(publicId) => {
    try {
        const imageName = url.split(folder)[1];
        const publicId = folder+imageName.split('.')[0];
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.log(error);
        return { message: "Delete from cloudinary failed" }
    }
}

module.exports = { uploadToCloudinary, deleteFromCloudinary };
