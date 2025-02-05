const controller = {}
const fs = require('fs')
const { storageModel } = require('../models')
const handleErrors = require('../utils/handleErrors')
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
    endpoint: 'https://a65d7916a6d267b383c5d1513c500c3a.r2.cloudflarestorage.com',
    region: 'auto',
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});

const PUBLIC_URL = process.env.PUBLIC_URL
const MEDIA_PATH = `${__dirname}/../storage`
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL

controller.obtenerStorages = async (req, res) => {
    const data = await storageModel.findAll({})
    res.send({ data })
}


// Subir archivo a Cloudflare R2 y guardarlo en la base de datos
controller.crearStorage = async (req, res) => {
    try {
        const { file } = req;

        if (!file) {
            return res.status(400).json({ error: 'No se subió ningún archivo' });
        }

        // URL del archivo en Cloudflare R2
        const fileUrl = `${R2_PUBLIC_URL}/${file.filename}`;

        // Guardar la información en la base de datos
        const fileData = {
            filename: file.originalname,
            url: fileUrl, // URL de Cloudflare R2
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


controller.eliminarStorage = async (req, res) => {
    try {
        const id = req.params.idStorage;
        console.log(req.params);
        
        const dataFile = await storageModel.findByPk(id);

        if (!dataFile) {
            return res.status(404).json({ error: 'Archivo no encontrado' });
        }

        // Extrae el key del archivo en R2
        const fileKey = dataFile.url.replace(`${R2_PUBLIC_URL}/`, '');

        // Elimina la imagen de Cloudflare R2
        await s3.send(new DeleteObjectCommand({
            Bucket: 'adoptahuellas',
            Key: fileKey,
        }));

        // Elimina la referencia en la base de datos
        await storageModel.destroy({ where: { id } });

        res.send({ message: 'Archivo eliminado correctamente', deleted: 1 });
    } catch (error) {
        console.error(error);
        handleErrors(res, 'ERROR_DELETE_STORAGE', 403);
    }
};


module.exports = controller