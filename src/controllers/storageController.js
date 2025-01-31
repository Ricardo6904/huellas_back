const controller = {}
const fs = require('fs')
const { storageModel } = require('../models')
const handleErrors = require('../utils/handleErrors')

const PUBLIC_URL = process.env.PUBLIC_URL
const MEDIA_PATH = `${__dirname}/../storage`
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL

controller.obtenerStorages = async (req, res) => {
    const data = await storageModel.findAll({})
    res.send({ data })
}


/* controller.crearStorage = async (req, res) => {
    const { body, file } = req
    console.log(file);
    const fileData = {
        id: 0,
        filename: file.filename,
        url: `${PUBLIC_URL}/${file.filename}`
    }
    const data = await storageModel.create(fileData)
    res.send({data})
} */

// Subir archivo a Cloudflare R2 y guardarlo en la base de datos
controller.crearStorage = async (req, res) => {
    try {
        
        const { file } = req;
        if (!file) return res.status(400).json({ error: 'No se subió ningún archivo' });

        const fileUrl = `${R2_PUBLIC_URL}/${file.filename}`; // URL final del archivo en R2

        const fileData = {
            id: 0,
            filename: file.originalname,
            url: fileUrl, // Se guarda la URL de Cloudflare en la BD
        };

        const data = await storageModel.create(fileData);
        res.send({ data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al subir imagen' });
    }
};

controller.obtenerStoragePorId = async (req, res) => {
    const idStorage = req.params.idStorage
    console.log(idStorage);
    const data = await storageModel.findByPk(idStorage)
    console.log(data);
    res.send({ data })
}

/* controller.eliminarStorage = async (req, res) => {
    try {
        const id = req.params.id
        const dataFile = await storageModel.findByPk(id)
        const { filename } = dataFile

        const filePath = `${MEDIA_PATH}/${filename}`

        fs.unlinkSync(filePath)

        const data = {
            filePath,
            deleted: 1
        }
        res.send({ data })
    } catch (error) {
        console.log(error);

        handleErrors(res, 'ERROR_DELETE_STORAGE', 403)
    }
} */

// Eliminar archivo de Cloudflare R2 y de la base de datos
controller.eliminarStorage = async (req, res) => {
    try {
        const id = req.params.id;
        const dataFile = await storageModel.findByPk(id);

        if (!dataFile) {
            return res.status(404).json({ error: 'Archivo no encontrado' });
        }

        const fileKey = dataFile.url.replace(`${R2_PUBLIC_URL}/`, ''); // Extrae el key del archivo en R2

        // Elimina la imagen de Cloudflare R2
        await s3.deleteObject({
            Bucket: BUCKET_NAME,
            Key: fileKey,
        }).promise();

        // Elimina la referencia en la base de datos
        await storageModel.destroy({ where: { id } });

        res.send({ message: 'Archivo eliminado correctamente', deleted: 1 });
    } catch (error) {
        console.error(error);
        handleErrors(res, 'ERROR_DELETE_STORAGE', 403);
    }
};

const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

// Configurar Cloudflare R2 con AWS SDK
const s3 = new AWS.S3({
    endpoint: 'https://a65d7916a6d267b383c5d1513c500c3a.r2.cloudflarestorage.com', // Usa tu endpoint
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    signatureVersion: 'v4',
});

// Nombre del bucket en R2
const BUCKET_NAME = 'adoptahuellas';

// Middleware de subida con Multer
const upload = multer({
    storage: multerS3({
        s3,
        bucket: BUCKET_NAME,
        acl: 'public-read', // Permite acceso público a las imágenes
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, `imagenes/${Date.now()}-${file.originalname}`); // Guarda en la carpeta "imagenes/"
        },
    }),
});

// Middleware para manejar la subida de imágenes
controller.subirImagen = upload.single('file');


module.exports = controller