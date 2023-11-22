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
    const [order] = await (await conexion)
      .execute('INSERT INTO pedido (id_pedido ,preferencias ,fecha_pedido ,precio_total ,estado ,id_venta ,matricula ,id_producto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [id_pedido ,preferencias ,fecha_pedido ,precio_total ,estado ,id_venta ,matricula ,id_producto]);
    return order;
  } catch (error) {
    console.error('Error al intentar registrar pedido:', error);
    throw error;
  }
}

const updateOrder = async (id_pedido ,preferencias ,fecha_pedido ,precio_total ,estado ,id_venta ,matricula ,id_producto) => {
  try {
    const [output] = await (await conexion)
      .execute('UPDATE estudiantes SET preferencias = ? ,fecha_pedido = ? ,precio_total = ? ,estado = ? ,id_venta = ? ,matricula = ? ,id_producto = ? WHERE id_pedido = ?',
        [matricula, nombre, apellido_paterno, apellido_materno, correo_institucional, password]);
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



