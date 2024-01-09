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


const pedidosCreate = async (req, res = response) => {
  const {preferencias ,fechaPedido ,precioTotal ,estado ,id_venta ,matricula ,id_producto} = req.body;
  try {
   
    const order = await dao.createOrder(preferencias ,fechaPedido ,precioTotal ,estado ,id_venta ,matricula ,id_producto);
    const idGenerated = order.idPedido;
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
    const { preferencias ,fechaPedido ,precioTotal ,estado ,id_venta ,matricula ,id_producto} = req.body;
    const output = await dao.updateOrder(preferencias ,fechaPedido ,precioTotal ,estado ,id_venta ,matricula ,id_producto);
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
    pedidosCreate,
    pedidosUpdate
  
};