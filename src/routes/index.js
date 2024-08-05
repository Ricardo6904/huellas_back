// routes/index.js
const express = require('express');
const router = express.Router();
const fs = require('fs');

const pathRouter = `${__dirname}`;

const removeExtension = (fileName) => {
    return fileName.split('.').shift();
}

fs.readdirSync(pathRouter).forEach((file) => {
    const name = removeExtension(file);
    if (name !== 'index') {
        //console.log(`Cargando ruta /${name} y archivo ${file}`)
        router.use(`/${name}`, require(`./${file}`))
    }
})

router.get('*', (req, res) => {
    res.status(404)
    res.send({ error: 'Not found' })
})

module.exports = router;
