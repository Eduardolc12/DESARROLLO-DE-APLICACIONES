const { request, response } = require('express');
const dao = require('../middlewares/pedido');

const pedidosGet = async (req, res = response) => {
  const orders= await dao.getAllOrder();
  res.send(orders)

}

const pedidosGetById= async (req, res = response) => {
  const { idPedido} = req.body;
  const order = await dao.getAllOrderById(idPedido);
  res.json({
    order
  });
}

const pedidosVendedor = async (req, res) => {
  const { matricula } = req.params;
  try {
    const pedido = await dao.getAllOrderVendedor(matricula);
    res.send(pedido)
  }
  catch (error) {
    res.status(500).json({ msg: "Error al actualizar el pedido" });
  }
}

const pedidosCreate = async (req, res = response) => {
  const {preferencias ,fechaPedido ,precioTotal ,estado ,matricula ,id_producto} = req.body;
  try {
   
    const order = await dao.createOrder(preferencias ,fechaPedido ,precioTotal ,estado ,matricula ,id_producto);
    const idGenerated = order.insertId;
    res.json({
      idPedido: idGenerated
    });
    
  } catch (error) {
    res.status(500).json({ msg: "Error al crear el pedido" });
  }
}

const pedidosUpdate = async (req, res) => {
  const { idPedido } = req.params;
  try {
    const { preferencias ,fechaPedido ,precioTotal ,estado ,matricula ,id_producto} = req.body;
    const output = await dao.updateOrder(idPedido, preferencias ,fechaPedido ,precioTotal ,estado  ,matricula ,id_producto);
  
    res.json({
      msg: "Datos del pedido actualizados",
      idPedido,
      affectedRows: output.affectedRows
    });
  }
  catch (error) {
    res.status(500).json({ msg: "Error al actualizar el pedido" });
  }
}

module.exports = {
  pedidosGet,
    pedidosGetById,
    pedidosVendedor,
    pedidosCreate,
    pedidosUpdate
  
};