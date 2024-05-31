const express = require('express');
const cors = require('cors');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('../docs/openapi.json');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        
        this.middlewares();

        this.routes();
    }

    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(express.json()); //lectura y parseo del body
        this.app.use(cors());
    }

    routes(){
        this.app.use('/api/estudiantes', require('../routes/estudiante'));
        this.app.use('/api/pedido', require('../routes/pedido'));
        this.app.use('/api/comprador', require('../routes/comprador'));
        this.app.use('/api/producto', require('../routes/producto'));
        this.app.use('/api/productosFavoritos', require('../routes/productosFavoritos'));
        this.app.use('/api/valoracion', require('../routes/valoracion'));
        this.app.use('/api/vendedor', require('../routes/vendedor'));
        this.app.use('/api/venta', require('../routes/venta'));


        this.app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(swaggerDocument));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Im Hungry API listening on port ${this.port}`)
          })
    }

}

module.exports = Server;