const { request, response } = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const crypto = require("crypto-js");
const dao = require('../middlewares/producto');

const productoGet = async (req, res = response) => {
  const productos = await dao.getAllProducts();
  res.send(productos)
 
}

const productoGetByName= async (req, res = response) => {
  const { name } = req.params;
  const product = await dao.getAllProductsByName(name);
  res.json({
    product
  });
}


const productoCreate = async (req, res = response) => {
  const {id_producto,nombre,descripcion,cantidadDisponible,
    horaVentaInicial,horaVentaFinal,puntoEncuentro,precio,estado,foto} = req.body;
  try {
    const product = await dao.createProduct(id_producto,nombre,descripcion,cantidadDisponible,
      horaVentaInicial,horaVentaFinal,puntoEncuentro,precio,estado,foto);
        const idGenerated = product.insertId;
    
    res.json({
      id_producto: idGenerated
    });
  } catch (error) {
    res.status(500).json({ msg: "Error al crear el producto" });
  }
}

const productoUpdate = async (req, res) => {
  const { id_producto} = req.params;
  try {
    const { nombre,descripcion,cantidadDisponible,
      horaVentaInicial,horaVentaFinal,puntoEncuentro,precio,estado,foto} = req.body;
   
    const output = await dao.updateProduct(nombre,descripcion,cantidadDisponible,
      horaVentaInicial,horaVentaFinal,puntoEncuentro,precio,estado,foto);
    res.json({
      msg: "Datos del producto actualizados",
      id_producto,
      affectedRows: output.affectedRows
    });
  }
  catch (error) {
    res.status(500).json({ msg: "Error al actualizar el producto" });
  }
}


module.exports = {
    productoGet,
    productoGetByName,
    productoCreate,
    productoUpdate,
};