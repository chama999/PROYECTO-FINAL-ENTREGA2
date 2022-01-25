import app from './server.js'
import config from './config.js'

console.log(config.env.PORT)

const server = app.listen(config.env.PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
