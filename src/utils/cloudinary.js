const cloudinary = require("cloudinary").v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async(localFilePath, filename) => {
    try {
        // Aquí le podemos cambiar el nombre a la carpeta de "main", y ponerle
        // un nombre diferente a la carpeta donde queramos subir nuestros archivos
        // a cloudinary
        const folder = "backend-final";
        const filePathOnCloudinary = folder + "/" + path.parse(filename).name; //backend-final
        const result = await cloudinary.uploader.upload( 
            localFilePath, 
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
