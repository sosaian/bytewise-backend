const app = require('./app')

const PORT = 3000 // "process.env.PORT || 3000" Si se usa .env a futuro.

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})