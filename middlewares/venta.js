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

const createVenta = async (id_venta, cantidad, fecha_venta,precio_total) => {

  try {
    const [sale] = await (await conexion)
      .execute('INSERT INTO venta (id_venta, cantidad, fecha_venta,precio_total) VALUES (?, ?, ?, ?)',
        [id_venta, cantidad, fecha_venta,precio_total]);
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