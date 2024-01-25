const { request, response } = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const crypto = require("crypto-js");
const dao = require('../middlewares/venta');

const ventaGet = async (req, res = response) => {
  const ventas = await dao.getAllVenta();
  console.log("solicitud recibida");
  res.send(ventas)
 
}

const ventaGetMatricula = async (req, res = response) => {
  const { matricula} = req.params;
  const ventas = await dao.getAllVentaMatricula(matricula);
  console.log("solicitud recibida");
  res.send(ventas)
 
}



const ventaCreate = async (req, res = response) => {
  const { cantidad, fecha_venta,precio_total,idPedido} = req.body;
  try {
    const sale = await dao.createVenta(cantidad, fecha_venta,precio_total,idPedido);
    const  idGeneraded= sale.insertId;
    
    res.json({
        id_venta: idGeneraded
    });
  } catch (error) {
    res.status(500).json({ msg: "Error al registrar la venta" });
  }
}



module.exports = {
    ventaGet,
    ventaGetMatricula,
    ventaCreate,
};