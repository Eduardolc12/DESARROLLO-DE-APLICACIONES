const { request, response } = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const crypto = require("crypto-js");
const dao = require('../middlewares/venta');

const ventaGet = async (req, res = response) => {
  const ventas = await dao.getAllVenta();
  res.send(ventas)
 
}



const ventaCreate = async (req, res = response) => {
  const {id_venta, cantidad, fecha_venta,precio_total} = req.body;
  try {
    const sale = await dao.createVenta(id_venta, cantidad, fecha_venta,precio_total);
        
    
    res.json({
        id_venta: id_venta
    });
  } catch (error) {
    res.status(500).json({ msg: "Error al registrar la venta" });
  }
}



module.exports = {
    ventaGet,
    ventaCreate,
};