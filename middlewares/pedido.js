const conexion = require('../config/conexion');

const getAllOrder = async () => {
  try {
    const [rows, fields] = await (await conexion).execute('SELECT * FROM pedido');
    return rows;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
}

const getAllOrderById = async (id_pedido) => {
  try {
    const [rows, fields] = await (await conexion)
      .execute('SELECT * FROM pedido WHERE id_pedido = ?', [id_pedido]);
    return rows;
  } catch (error) {
    console.error('Error al obtener el pedido:', error);
    throw error;
  }
}


const createOrder = async (id_pedido ,preferencias ,fecha_pedido ,precio_total ,estado ,id_venta ,matricula ,id_producto) => {
    
  try {
    const idPedidoValido = id_pedido !== undefined ? id_pedido : null;
    const preferenciasValidas = preferencias !== undefined ? preferencias : null;
    const fechaPedidoValida = fecha_pedido !== undefined ? fecha_pedido : null;
    const precioTotalValido = precio_total !== undefined ? precio_total : null;
    const estadoValido = estado !== undefined ? estado : null;
    const idVentaValido = id_venta !== undefined ? id_venta : null;
    const matriculaValida = matricula !== undefined ? matricula : null;
    const idProductoValido = id_producto !== undefined ? id_producto : null;

    // Utilizar los valores verificados en la consulta SQL
    const [order] = await (await conexion)
      .execute('INSERT INTO pedido (id_pedido, preferencias, fecha_pedido, precio_total, estado, id_venta, matricula, id_producto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [idPedidoValido, preferenciasValidas, fechaPedidoValida, precioTotalValido, estadoValido, idVentaValido, matriculaValida, idProductoValido]);
    return order;
  } catch (error) {
    console.error('Error al intentar registrar pedido:', error);
    throw error;
  }
}

const updateOrder = async (id_pedido ,preferencias ,fecha_pedido ,precio_total ,estado ,id_venta ,matricula ,id_producto) => {
  try {
    const idPedidoValido = id_pedido !== undefined ? id_pedido : null;
    const preferenciasValidas = preferencias !== undefined ? preferencias : null;
    const fechaPedidoValida = fecha_pedido !== undefined ? fecha_pedido : null;
    const precioTotalValido = precio_total !== undefined ? precio_total : null;
    const estadoValido = estado !== undefined ? estado : null;
    const idVentaValido = id_venta !== undefined ? id_venta : null;
    const matriculaValida = matricula !== undefined ? matricula : null;
    const idProductoValido = id_producto !== undefined ? id_producto : null;

    // Utilizar los valores verificados en la consulta SQL
    const [output] = await (await conexion)
      .execute('UPDATE pedido SET preferencias = ?, fecha_pedido = ?, precio_total = ?, estado = ?, id_venta = ?, matricula = ?, id_producto = ? WHERE id_pedido = ?',
        [preferenciasValidas, fechaPedidoValida, precioTotalValido, estadoValido, idVentaValido, matriculaValida, idProductoValido, idPedidoValido]);
     return output;
  } catch (error) {
    console.error('Error al intentar actualizar el pedido:', error);
    throw error;
  }
}


module.exports = { 
    getAllOrder,
    getAllOrderById, 
    createOrder,
    updateOrder
 }



