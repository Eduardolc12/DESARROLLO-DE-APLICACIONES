const { request, response } = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const crypto = require("crypto-js");
const dao = require('../middlewares/productosFavoritos');

const productoFavGet = async (req, res = response) => {
  const productos = await dao.getAllFavProducts;
  res.send(productos)
 
}


const productoFavCreate = async (req, res = response) => {
  const {idFavoritos,matricula,id_producto} = req.body;
  try {
    const product = await dao.createFavProduct(idFavoritos,matricula,id_producto);
        const idGenerated = product.insertId;
    
    res.json({
        msg: "creación exitosa",
      id_Favoritos: idGenerated
    });
  } catch (error) {
    res.status(500).json({ msg: "Error al agregar favorito" });
  }
}

const productoFavDelete= async (req, res) => {
  const { idFavoritos} = req.params;
  try {
    const output = await dao.deleteFavProduct(idFavoritosd);
    res.json({
      msg: "producto eliminado de favoritos",
      idFavoritos,
      affectedRows: output.affectedRows
    });
  }
  catch (error) {
    res.status(500).json({ msg: "Error al eliminar de favoritos" });
  }
}


module.exports = {
    productoFavGet,
    productoFavCreate,
    productoFavDelete,
};