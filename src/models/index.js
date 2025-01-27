const models = {
    usuarioModel: require('./usuarios'),
    storageModel: require('./storage'),
    mascotaModel: require('./mascotas'),
    adopcionModel: require('./adopciones'),
    refugioModel: require('./refugios'),
    avistamientoModel: require('./avistamientos'),
    mascotaPerdidaModel: require('./mascotasPerdidas'),
    ciudadModel: require('./ciudades'),
    provinciaModel: require('./provincias'),
}

module.exports = models;