const { request, response } = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const crypto = require("crypto-js");
const dao = require('../middlewares/producto');

const productoGet = async (req, res = response) => {
  const productos = await dao.getAllProducts();
  res.send(productos)
 
}

const productoGetByName= async (req, res = response) => {
  
  const { nombre,matricula } = req.params;
  const producto = await dao.getAllProductsByName(nombre,matricula);
  res.json({
    producto
  });
}

const productoByName= async (req, res = response) => {
  
  const { nombre } = req.params;
  const producto = await dao.getProductByName(nombre);
  res.json({
    producto
  });
}
const productoCreate = async (req, res = response) => {
  const {nombre,descripcion,cantidadDisponible,horaVentaInicial,horaVentaFinal,puntoEncuentro,precio,estado,foto} = req.body;
  try {
   
    const product = await dao.createProduct(nombre,descripcion,cantidadDisponible,horaVentaInicial,horaVentaFinal,puntoEncuentro,precio,estado,foto);
       
    const   idGeneraded = product.insertId;
    res.json({
      id_producto:  idGeneraded
    });
  } catch (error) {
    res.status(500).json({ msg: "Error al crear el producto" });
  }
}

const productoUpdate = async (req, res) => {
  const {id_producto} = req.params;
  try {
    const { nombre,descripcion,cantidadDisponible,
      horaVentaInicial,horaVentaFinal,puntoEncuentro,precio,estado,foto} = req.body;
   
    const output = await dao.updateProduct(id_producto,nombre,descripcion,cantidadDisponible,
      horaVentaInicial,horaVentaFinal,puntoEncuentro,precio,estado,foto);
      console.log("solicitud recibida");
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

const subirImagen = async(req, res)=>{
  const {filename} = req.file; // Acceder al nombre del archivo
  try {
    console.log(filename);
    res.send({ data: 'Imagen subida' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al subir la imagen' });
  }
  
};

const productoDelete = async (req, res) => {
  const { id_producto } = req.params;
  try {
    const output = await dao.deleteProduct(id_producto);
    res.json({
      msg: "Producto eliminado",
      affectedRows: output.affectedRows
    });
  }
  catch (error) {
    res.status(500).json({ msg: "Error al eliminar el producto" });
  }
}
module.exports = {
    productoGet,
    productoGetByName,
    productoByName,
    productoCreate,
    productoUpdate,
    subirImagen,
    productoDelete
  
};