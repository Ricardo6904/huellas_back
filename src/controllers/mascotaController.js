controller = {}
const { Op } = require('sequelize')
const { mascotasModel } = require('../models')
const { storageModel } = require('../models')
const handleErrors = require('../utils/handleErrors')
const fs = require('fs')

const MEDIA_PATH = `${__dirname}/../storage`


controller.obtenerMascota = async (req, res) => {
    try {

        
        const id = req.params.id

        const data = await mascotasModel.findOneData(id)
        res.send({ data })
    } catch (error) {
        console.log(error);
        
        handleErrors(res, 'ERROR_GET_MASCOTA', 403)
    }
}

controller.obtenerMascotas = async (req, res) => {
    try {
        //parámetros de paginación
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * limit;

        //filtros de búsqueda
        const { nombre, edad, raza, tamano } = req.query;

        let filtro = {
            estado: {
                [Op.notIn]: ['adoptado','pendiente']
            }
        };

        if (nombre)
            filtro.nombre = { [Op.like]: `%${nombre}%` };
        if (edad)
            filtro.edad = edad;
        if (raza)
            filtro.raza = raza;
        if (tamano)
            filtro.tamano = tamano;


        //consulta con paginación usando limit y offset
        const { count, rows } = await mascotasModel.findAndCountAllData(
            limit,
            offset,
            filtro
        )

        //devolver la respuesta con datos y paginación
        res.send({
            data: rows,
            total: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        })
    } catch (error) {
        console.log(error);
        
        handleErrors(res, 'ERROR_GET_MASCOTA', 403)
    }
}

controller.obtenerMascotasPorIdUsuario = async (req, res) => {
    try {
        //parámetros de paginación
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * limit;

        const idUsuario = req.params.id

        console.log('idusuario',req.params);
        

        let filtro = {idUsuario};
        //filtro.id = idUsuario

        //filtro por nombre
        const { nombre } = req.query;
        if (nombre) {
            filtro.nombre = { [Op.like]: `%${nombre}%` };
        }


        const { count, rows } = await mascotasModel.findAndCountAllData(
            limit,
            offset,
            filtro
        )

        console.log(rows);
        

        res.send({
            data: rows,
            total: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        })
    } catch (error) {
        console.log(error);
        
        handleErrors(res, 'ERROR_GET_MASCOTA_USUARIO', 403)
    }
}

controller.crearMascota = async (req, res) => {
    try {
        const { body } = req
        const mascota = await mascotasModel.create(body)

        const mascotaUrl = `${mascota.urlQR}/${mascota.id}`

        mascota.urlQR = mascotaUrl
        await mascota.save()

        res.send({ mascota })
    } catch (error) {
        console.log(error);
        
        handleErrors(res, 'ERROR_CREATE_MASCOTA', 403)
    }

}

controller.actualizarMascota = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.params;

        // Buscar la mascota
        const mascota = await mascotasModel.findByPk(id);

        if (!mascota) {
            return res.status(404).send({ message: 'Mascota no encontrada' });
        }

        // Si cambia a "adoptado", restablecer solicitudes pendientes
        if (estado === 'adoptado') {
            mascota.solicitudesPendientes = 0;
        }


        const body = req.body;
        const update = await mascotasModel.update(body, { where: { id: id } })
        const data = await mascotasModel.findByPk(id)
        res.send({ message: 'Mascota actualizada', data: mascota });
    } catch (error) {
        handleErrors(res, 'ERROR_UPDATE_MASCOTA', 403)
    }
}


controller.eliminarMascota = async (req, res) => {
    try {
        const id = req.params.id
        const mascota = await mascotasModel.findOneData(id)
        const data = await animalRescatado.destroy({ where: { id: id } })
        const idStorage = mascota.idStorage

        const dataFile = await storageModel.findByPk(idStorage)
        const { filename } = dataFile

        const filePath = `${MEDIA_PATH}/${filename}`

        fs.unlinkSync(filePath)

        const dataStorage = await storageModel.destroy({ where: { id: idStorage } })

        res.send({ msg: 'Mascota eliminada' })
    } catch (error) {
        console.log(error);

        handleHttpError(res, 'ERROR_DELETE_MASCOTA', 403)
    }
}

/* controller.redirigirMascota = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar la mascota en la base de datos
        const mascota = await mascotasModel.findByPk(id);

        if (!mascota) {
            return res.status(404).send({ message: 'Mascota no encontrada' });
        }

        // URL de redirección almacenada en la base de datos
        const urlDestino = `${mascota.urlQR}/${id}`;

        // Redirigir al usuario a la URL del frontend
        return res.redirect(301, urlDestino); // 301 para redirección permanente
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error en la redirección' });
    }
};
 */

controller.redirigirMascota = async (req, res) => {
    try {
        const { id } = req.params;
        

        // URL de redirección al frontend
        const frontendUrl = `https://www.adoptahuellas.pet/usuario/mascota/${id}`;
        console.log(frontendUrl);
        
        // Redirigir al usuario a la URL del frontend
        return res.redirect(301, frontendUrl); // 301 para redirección permanente
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error en la redirección' });
    }
};

module.exports = controller