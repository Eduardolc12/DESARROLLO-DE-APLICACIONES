const { request, response } = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const crypto = require("crypto-js");
const dao = require('../middlewares/productosFavoritos');

const productoFavGet = async (req, res = response) => {
  const { matricula} =req.params;
  const productos = await dao.getAllFavProducts(matricula);
  res.send(productos)
 
}

const productoById = async (req, res = response) => {
  const { id_producto} =req.params;
  console.log(""+id_producto);
  const favoritos = await dao.getAllFav(id_producto);
  res.send(favoritos)
 
}

const productoFavCreate = async (req, res = response) => {
  const {matricula,id_producto} = req.body;
  try {
    const product = await dao.createFavProduct(matricula,id_producto);
        const idGenerated = product.insertId;
    console.log(""+matricula);
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
    const output = await dao.deleteFavProduct(idFavoritos);
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
    productoById,
    productoFavCreate,
    productoFavDelete,
};