const models = {
    usuarioModel: require('./usuarios'),
    storageModel: require('./storage'),
    animalRescatadoModel: require('./animalRescatado'),
    adopcionModel: require('./adopciones'),
    refugioModel: require('./refugios'),
    ciudadModel: require('./ciudades'),
    provinciaModel: require('./provincias'),
    redesSocialesModel: require('./redesSociales'),
    mascotasModel: require('./mascotas'),
    historialMascotasModel: require('./historialMascotas')
}

module.exports = models;