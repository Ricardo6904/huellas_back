const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const sharp = require('sharp');

// Configurar Cloudflare R2 con AWS SDK v3
const s3 = new S3Client({
    endpoint: 'https://a65d7916a6d267b383c5d1513c500c3a.r2.cloudflarestorage.com', // Usa tu endpoint
    region: 'auto', // Cloudflare R2 no requiere una región específica, pero puedes usar 'auto'
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});

// Nombre del bucket en R2
const BUCKET_NAME = 'adoptahuellas';

// Middleware de compresión de imagen
const compressImage = async (req, res, next) => {
    if (!req.file) {
        return next();
    }

    try {
        console.log(req.file); // Para depuración
        
        let compressedImage;
        let originalName = req.file.originalname || 'image'; // Asegura un nombre base
        let newFilename;

        if (req.file.mimetype !== 'image/webp') {
            // Convertir a WebP si no es ya WebP
            compressedImage = await sharp(req.file.buffer)
                .resize(800) // Redimensionar a un ancho de 800px
                .webp({ quality: 80 }) // Convertir a WebP con calidad del 80%
                .toBuffer();

            newFilename = `${originalName.split('.').slice(0, -1).join('.')}.webp`;
        } else {
            // Comprimir sin cambiar el formato
            compressedImage = await sharp(req.file.buffer)
                .resize(800)
                .toBuffer();
            
            newFilename = originalName; // Mantiene el mismo nombre si ya es WebP
        }

        req.file.buffer = compressedImage; // Actualizar el buffer con la imagen comprimida
        req.file.filename = newFilename; // Asigna correctamente el nombre del archivo

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al comprimir la imagen' });
    }
};


// Configuración personalizada de almacenamiento para Multer
const storage = multer.memoryStorage(); // Almacenar el archivo en memoria como un buffer

const uploadMiddleware = multer({
    storage: storage, // Usar el almacenamiento en memoria
    limits: { fileSize: 300 * 1024 * 1024 }, // Límite de 300 MB
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten archivos de imagen (JPEG, PNG, GIF, WEBP)'), false);
        }
    }
});

// Middleware para subir el archivo comprimido a Cloudflare R2
const uploadToR2 = async (req, res, next) => {
    if (!req.file) {
        return next();
    }

    try {
        const filename = req.file.filename;
        const buffer = req.file.buffer;

        // Subir el archivo a Cloudflare R2
        await s3.send(new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: filename,
            Body: buffer,
            ContentType: req.file.mimetype,
            ACL: 'public-read', // Permite acceso público al archivo
        }));

        // Guardar la URL del archivo en req.file.url
        req.file.url = `${process.env.R2_PUBLIC_URL}/${filename}`;

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al subir la imagen a Cloudflare R2' });
    }
};

module.exports = { uploadMiddleware, compressImage, uploadToR2 };