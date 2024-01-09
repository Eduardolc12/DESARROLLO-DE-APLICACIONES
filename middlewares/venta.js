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

const createVenta = async (cantidad, fecha_venta,precio_total) => {

  try {
   
    const cantidadValida = cantidad !== undefined ? cantidad : null;
    const fechaVentaValida = fecha_venta !== undefined ? fecha_venta : null;
    const precioTotalValido = precio_total !== undefined ? precio_total : null;

    // Utilizar los valores verificados en la consulta SQL
    const [sale] = await (await conexion)
      .execute('INSERT INTO venta ( cantidad, fecha_venta, precio_total) VALUES (?, ?, ?, ?)',
        [idVentaValido, cantidadValida, fechaVentaValida, precioTotalValido]);
    return sale;
  } catch (error) {
    console.error('Error al intentar registrar la venta:', error);
    throw error;
  }
}




module.exports = { 
  getAllVenta,
  createVenta
 }