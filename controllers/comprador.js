const { request, response } = require('express');
const dao = require('../middlewares/comprador');

const compradorGet = async (req, res = response) => {
  const comprador = await dao.getAllComprador();
  res.send(comprador)
 
}

const compradorCreate = async (req, res = response) => {
  const {idComprador,matricula,id_producto} = req.body;
  try {
    const buyer = await dao.createComprador(idComprador,matricula,id_producto);
        const idGenerated = buyer.insertId;
    
    res.json({
        msg: "creación exitosa",
      idComprador: idGenerated
    });
  } catch (error) {
    res.status(500).json({ msg: "Error al agregar comprador" });
  }
}

const compradorDelete= async (req, res) => {
  const { idComprador} = req.params;
  try {
    const output = await dao.deleteVendedor(idComprador);
    res.json({
      msg: "comprador eliminado",
      idComprador,
      affectedRows: output.affectedRows
    });
  }
  catch (error) {
    res.status(500).json({ msg: "Error al eliminar comprador" });
  }
}


module.exports = {
  compradorGet,
  compradorCreate,
  compradorDelete,
};