'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ciudades', [
      // Azuay
      { id: 1, nombre: 'Cuenca', idProvincia: 1 },
      { id: 2, nombre: 'Girón', idProvincia: 1 },
      { id: 3, nombre: 'Gualaceo', idProvincia: 1 },
      { id: 4, nombre: 'Nabón', idProvincia: 1 },
      { id: 5, nombre: 'Paute', idProvincia: 1 },
      { id: 6, nombre: 'Pucará', idProvincia: 1 },
      { id: 7, nombre: 'San Fernando', idProvincia: 1 },
      { id: 8, nombre: 'Santa Isabel', idProvincia: 1 },
      { id: 9, nombre: 'Sigsig', idProvincia: 1 },
      { id: 10, nombre: 'Oña', idProvincia: 1 },
      { id: 11, nombre: 'Chordeleg', idProvincia: 1 },
      { id: 12, nombre: 'El Pan', idProvincia: 1 },
      { id: 13, nombre: 'Sevilla de Oro', idProvincia: 1 },

      // Pichincha
      { id: 14, nombre: 'Quito', idProvincia: 2 },
      { id: 15, nombre: 'Cayambe', idProvincia: 2 },
      { id: 16, nombre: 'Mejía', idProvincia: 2 },
      { id: 17, nombre: 'Pedro Moncayo', idProvincia: 2 },
      { id: 18, nombre: 'Rumiñahui', idProvincia: 2 },
      { id: 19, nombre: 'San Miguel de los Bancos', idProvincia: 2 },
      { id: 20, nombre: 'Pedro Vicente Maldonado', idProvincia: 2 },
      { id: 21, nombre: 'Puerto Quito', idProvincia: 2 },

      // Guayas
      { id: 22, nombre: 'Guayaquil', idProvincia: 3 },
      { id: 23, nombre: 'Daule', idProvincia: 3 },
      { id: 24, nombre: 'Milagro', idProvincia: 3 },
      { id: 25, nombre: 'Samborondón', idProvincia: 3 },
      { id: 26, nombre: 'Durán', idProvincia: 3 },
      { id: 27, nombre: 'Balzar', idProvincia: 3 },
      { id: 28, nombre: 'Colimes', idProvincia: 3 },
      { id: 29, nombre: 'El Empalme', idProvincia: 3 },
      { id: 30, nombre: 'El Triunfo', idProvincia: 3 },
      { id: 31, nombre: 'General Villamil (Playas)', idProvincia: 3 },
      { id: 32, nombre: 'Isidro Ayora', idProvincia: 3 },
      { id: 33, nombre: 'Jujan', idProvincia: 3 },
      { id: 34, nombre: 'Naranjal', idProvincia: 3 },
      { id: 35, nombre: 'Naranjito', idProvincia: 3 },
      { id: 36, nombre: 'Palestina', idProvincia: 3 },
      { id: 37, nombre: 'Pedro Carbo', idProvincia: 3 },
      { id: 38, nombre: 'Salitre', idProvincia: 3 },
      { id: 39, nombre: 'Santa Lucía', idProvincia: 3 },
      { id: 40, nombre: 'Simón Bolívar', idProvincia: 3 },
      { id: 41, nombre: 'Yaguachi', idProvincia: 3 },

      // Tungurahua
      { id: 42, nombre: 'Ambato', idProvincia: 4 },
      { id: 43, nombre: 'Baños de Agua Santa', idProvincia: 4 },
      { id: 44, nombre: 'Cevallos', idProvincia: 4 },
      { id: 45, nombre: 'Mocha', idProvincia: 4 },
      { id: 46, nombre: 'Patate', idProvincia: 4 },
      { id: 47, nombre: 'Píllaro', idProvincia: 4 },
      { id: 48, nombre: 'Quero', idProvincia: 4 },
      { id: 49, nombre: 'Tisaleo', idProvincia: 4 },

      // Chimborazo
      { id: 50, nombre: 'Riobamba', idProvincia: 5 },
      { id: 51, nombre: 'Alausí', idProvincia: 5 },
      { id: 52, nombre: 'Chambo', idProvincia: 5 },
      { id: 53, nombre: 'Chunchi', idProvincia: 5 },
      { id: 54, nombre: 'Colta', idProvincia: 5 },
      { id: 55, nombre: 'Cumandá', idProvincia: 5 },
      { id: 56, nombre: 'Guamote', idProvincia: 5 },
      { id: 57, nombre: 'Guano', idProvincia: 5 },
      { id: 58, nombre: 'Pallatanga', idProvincia: 5 },
      { id: 59, nombre: 'Penipe', idProvincia: 5 },

      // Cotopaxi
      { id: 60, nombre: 'Latacunga', idProvincia: 6 },
      { id: 61, nombre: 'La Maná', idProvincia: 6 },
      { id: 62, nombre: 'Pangua', idProvincia: 6 },
      { id: 63, nombre: 'Pujilí', idProvincia: 6 },
      { id: 64, nombre: 'Salcedo', idProvincia: 6 },
      { id: 65, nombre: 'Saquisilí', idProvincia: 6 },
      { id: 66, nombre: 'Sigchos', idProvincia: 6 },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ciudades', null, {});
  }
};
