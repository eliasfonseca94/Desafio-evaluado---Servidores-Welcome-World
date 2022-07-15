const http = require('http');
const url = require('url');
const fs = require('fs');
// Crear un servidor en Node con el módulo http.
http
    .createServer(function (req, res) {


        const params = url.parse(req.url, true).query

        const { archivo, nombre, contenido, nuevoNombre } = params


        // Disponibilizar una ruta para crear un archivo a partir de los parámetros de la consulta
        // recibida.
        if (req.url.includes('/crear')) {
            fs.writeFile(archivo, contenido, 'utf8', (err, data) => {
                const year = new Date().getFullYear();
                const month = new Date().getMonth()
                const day = new Date().getDay();
                const date = `${day}/${month < 10 ? '0' + month : month}/${year}`;
                console.log({ date })
                if (err) {
                    res.end('Problemas al crear el archivo')
                } else {
                    res.end('Archivo creado')
                }
            })
        }


        // // Disponibilizar una ruta para devolver el contenido de un archivo cuyo nombre es
        // // declarado en los parámetros de la consulta recibida.

        if (req.url.includes('/leer')) {
            fs.readFile(archivo, (err, data) => {
                if (err) {
                    res, end('El archivo no existe')
                } else {
                    res.end(data)
                }

            })
        }
        // // Disponibilizar una ruta para renombrar un archivo, cuyo nombre y nuevo nombre es
        // // declarado en los parámetros de la consulta recibida.

        if (req.url.includes("/renombrar")) {
            fs.rename(nombre, nuevoNombre, (err, data) => {
                if (err) {
                    res.end("Error al renombrar el archivo")
                } else {
                    res.end(`El archivo ${nombre}, ha sido renombrado como: ${nuevoNombre}`)
                }
            })
        }

        // // Disponibilizar una ruta para eliminar un archivo, cuyo nombre es declarado en los
        // // parámetros de la consulta recibida.

        if (req.url.includes("/eliminar")) {
            console.log(`se esta procesando la eliminación del ${archivo}`);
            function eliminar() {
                fs.unlink(archivo, (err, data) => {
                    if (err) {
                        res.end("No se puede eliminar el archivo ")
                    } else {
                        res.end(` ${archivo} a sido eliminado`)
                    }
                })
            } setTimeout(eliminar, 3000)
        }
    })
    .listen(8080, () => console.log('Server ON '))


