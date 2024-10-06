const controller = {}
const fs = require('fs')
const {storageModel} = require('../models')
const handleErrors = require('../utils/handleErrors')

const PUBLIC_URL = process.env.PUBLIC_URL
const MEDIA_PATH = `${__dirname}/../storage`

controller.obtenerStorages = async (req, res) => {
    const data = await storageModel.findAll({})
    res.send({data})
}

controller.crearStorage = async (req, res) => {
    const { body, file } = req
    console.log(file);
    const fileData = {
        idStorage: 0,
        filenameStorage: file.filename,
        urlStorage: `${PUBLIC_URL}/${file.filename}`
    }
    const data = await storageModel.create(fileData)
    res.send({data})
}

controller.obtenerStoragePorId = async (req, res) => {
    const idStorage = req.params.idStorage
    console.log(idStorage);
    const data = await storageModel.findByPk(idStorage)
    console.log(data);
    res.send({data})
}

controller.eliminarStorage = async (req, res) => {
    try {
        const id = req.params.idStorage
        const dataFile = await storageModel.findByPk(id)
        const {filenameStorage} = dataFile
        
        const filePath = `${MEDIA_PATH}/${filenameStorage}`

        fs.unlinkSync(filePath)
        
        const data = {
            filePath,
            deleted:1
        }
        res.send({data})
    } catch (error) {
        console.log(error);
        
        handleErrors(res,'ERROR_DELETE_STORAGE', 403)
    }
}

module.exports = controller