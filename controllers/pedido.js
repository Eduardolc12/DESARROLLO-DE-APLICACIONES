const { request, response } = require('express');
const dao = require('../middlewares/pedido');

const pedidosGet = async (req, res = response) => {
  const orders= await dao.getAllOrder();
  res.send(orders)

}

const pedidosGetById= async (req, res = response) => {
  const { id_pedido} = req.params;
  const order = await dao.getAllOrderById(id_pedido);
  res.json({
    order
  });
}


const pedidosCreate = async (req, res = response) => {
  const {preferencias ,fecha_pedido ,precio_total ,estado ,id_venta ,matricula ,id_producto} = req.body;
  try {
   
    const order = await dao.createOrder(preferencias ,fecha_pedido ,precio_total ,estado ,id_venta ,matricula ,id_producto);
    const idGenerated = order.id_pedido;
    res.json({
      id_pedido: idGenerated
    });
  } catch (error) {
    res.status(500).json({ msg: "Error al crear el pedido" });
  }
}

const pedidosUpdate = async (req, res) => {
  const { id_pedido } = req.params;
  try {
    const { preferencias ,fecha_pedido ,precio_total ,estado ,id_venta ,matricula ,id_producto} = req.body;
    const output = await dao.updateOrder(preferencias ,fecha_pedido ,precio_total ,estado ,id_venta ,matricula ,id_producto);
    res.json({
      msg: "Datos del pedido actualizados",
      id_pedido,
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