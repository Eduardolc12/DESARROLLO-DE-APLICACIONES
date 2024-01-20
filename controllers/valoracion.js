const { request, response } = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const crypto = require("crypto-js");
const dao = require('../middlewares/valoracion');

const valoracionGet = async (req, res = response) => {
  const valoracion = await dao.getAllValoracion();
  res.send(valoracion)

}


const  valoracionCreate= async (req, res = response) => {
    
  const {descripcion,calificacion,id_producto} = req.body;
  try {
    const qualification = await dao.createValoracion(descripcion,calificacion,id_producto);
        const idGenerated = qualification.insertId;
    
    res.json({

      id_valoracion: idGenerated
    });
  } catch (error) {
    res.status(500).json({ msg: "Error al crear valoracion" });
  }
}

const valoracionUpdate = async (req, res) => {
  const { id_valoracion} = req.params;
  try {
    const {descripcion, calificacion} = req.body;
   
    const output = await dao.updateValoracion(descripcion, calificacion);
    res.json({
      msg: "Datos de la valoracion actualizados",
      id_valoracion,
      affectedRows: output.affectedRows
    });
  }
  catch (error) {
    res.status(500).json({ msg: "Error al actualizar la valoración" });
  }
}


module.exports = {
    valoracionGet,
    valoracionCreate,
    valoracionUpdate,
};