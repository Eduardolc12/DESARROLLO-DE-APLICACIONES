const conexion = require('../config/conexion');

const getAllVenta = async () => {
  try {
    const [rows, fields] = await (await conexion).execute('SELECT * FROM venta');
    return rows;
  } catch (error) {
    console.error('Error al obtener las ventas:', error);
    throw error;
  }
}

const getAllVentaMatricula = async (matricula) => {
  try {
    const [rows, fields] = await (await conexion).
  execute('SELECT v.*, pr.nombre as nombre_producto FROM venta v JOIN pedido p ON v.idPedido = p.idPedido JOIN producto pr ON p.id_producto = pr.id_producto JOIN vendedor ven ON pr.id_producto = ven.id_producto JOIN estudiante e ON ven.matricula = e.matricula WHERE e.matricula = ?', [matricula])
    return rows;
  } catch (error) {
    console.error('Error al obtener las ventas:', error);
    throw error;
  }
}

const createVenta = async ( cantidad, fecha_venta,precio_total,idPedido) => {

  try {
    const idPedidoValida = idPedido !== undefined ? idPedido : null;
    const cantidadValida = cantidad !== undefined ? cantidad : null;
    const fechaVentaValida = fecha_venta !== undefined ? fecha_venta : null;
    const precioTotalValido = precio_total !== undefined ? precio_total : null;

    // Utilizar los valores verificados en la consulta SQL
    const [sale] = await (await conexion)
      .execute('INSERT INTO venta (cantidad, fecha_venta, precio_total,idPedido) VALUES (?, ?, ?, ?)',
        [cantidadValida, fechaVentaValida, precioTotalValido, idPedidoValida]);
    return sale;
  } catch (error) {
    console.error('Error al intentar registrar la venta:', error);
    throw error;
  }
}




module.exports = { 
  getAllVenta,
  getAllVentaMatricula,
  createVenta
 }