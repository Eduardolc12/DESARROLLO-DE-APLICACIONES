const { request, response } = require('express');
const dao = require('../middlewares/vendedor');

const vendedorGet = async (req, res = response) => {
  const vendedor = await dao.getAllVendedor();
  res.send(vendedor)
 
}


const vendedorCreate = async (req, res = response) => {
  const {matricula,id_producto} = req.body;
  try {
  
    const salesPerson = await dao.createVendedor(matricula,id_producto);
    const  idGeneraded= salesPerson.insertId;
    
    res.json({
        msg: "creación exitosa",
      idVendedor:  idGeneraded
    });
  } catch (error) {
    res.status(500).json({ msg: "Error al agregar vendedor" });
  }
}

const vendedorDelete= async (req, res) => {
  const { idVendedor} = req.params;
  try {
    const output = await dao.deleteVendedor(idVendedor);
    res.json({
      msg: "vendedor eliminado",
      idVendedor,
      affectedRows: output.affectedRows
    });
  }
  catch (error) {
    res.status(500).json({ msg: "Error al eliminar vendedor" });
  }
}

const vendedorGetProductos= async (req, res = response) => {
  
  const { matricula } = req.params;
  const productos = await dao.getAllProductos(matricula);
  res.send(productos)
}

module.exports = {
    vendedorGet,
    vendedorCreate,
    vendedorDelete,
    vendedorGetProductos
};