const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');

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

// Middleware de subida con Multer
const upload = multer({
    storage: multerS3({
        s3,
        bucket: BUCKET_NAME,
        acl: 'public-read', // Permite acceso público al archivo
        contentType: multerS3.AUTO_CONTENT_TYPE, // Detecta el tipo de contenido automáticamente
        key: function (req, file, cb) {
            // Genera el nombre del archivo
            const filename = `${Date.now()}-${file.originalname}`;
            // Guarda el nombre del archivo en req.file.filename
            file.filename = filename;
            // Define el nombre del archivo en Cloudflare R2
            cb(null, filename);
        },
    }),
    limits: { fileSize: 300 * 1024 * 1024 }, // Límite de 300 MB
});

module.exports = upload;