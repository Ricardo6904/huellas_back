const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const sharp = require('sharp');

const s3 = new S3Client({
    endpoint: 'https://a65d7916a6d267b383c5d1513c500c3a.r2.cloudflarestorage.com',
    region: 'auto', 
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});

const BUCKET_NAME = 'adoptahuellas';

const compressImage = async (req, res, next) => {
    if (!req.file) {
        return next();
    }

    try {

        let compressedImage;
        let originalName = req.file.originalname || 'image'; 
        let newFilename;

        if (req.file.mimetype !== 'image/webp') {
            compressedImage = await sharp(req.file.buffer)
                .rotate()
                .resize(800) 
                .webp({ quality: 80 }) 
                .toBuffer();

            newFilename = `${originalName.split('.').slice(0, -1).join('.')}.webp`;
        } else {
            compressedImage = await sharp(req.file.buffer)
                .rotate()
                .resize(800)
                .toBuffer();

            newFilename = originalName; 
        }

        req.file.buffer = compressedImage; 
        req.file.filename = newFilename;

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al comprimir la imagen' });
    }
};


const storage = multer.memoryStorage(); 

const uploadMiddleware = multer({
    storage: storage, 
    limits: { fileSize: 300 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten archivos de imagen (JPEG, PNG, GIF, WEBP)'), false);
        }
    }
});

const uploadToR2 = async (req, res, next) => {
    if (!req.file) {
        return next();
    }

    try {
        const filename = req.file.filename;
        const buffer = req.file.buffer;

        await s3.send(new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: filename,
            Body: buffer,
            ContentType: req.file.mimetype,
            ACL: 'public-read', 
        }));

        req.file.url = `${process.env.R2_PUBLIC_URL}/${filename}`;

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al subir la imagen a Cloudflare R2' });
    }
};

module.exports = { uploadMiddleware, compressImage, uploadToR2 };