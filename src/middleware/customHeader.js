const customHeader = (req, res, next) => {
    try {
        const apikey = req.headers.api_key
        if(apikey === 'ricardo'){
            next()
        }else{
            res.status(403)
            res.send({error:'APIKEY_INCORRECTA'})
        }
    } catch (error) {
        res.status(403)
        res.send({error:'ALGO_OCURRIO_EN_EL_CUSTOM_HEADER'})
    }
}

module.exports = customHeader