const conexion = require('../config/conexion');

const getAllProducts = async () => {
  try {
    const [rows, fields] = await (await conexion).execute('SELECT * FROM producto');
    return rows;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
}

const getAllProductsByName = async (nombre) => {
  try {
    const [rows, fields] = await (await conexion)
      .execute('SELECT * FROM producto WHERE nombre = ?', [nombre]);
    return rows;
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    throw error;
  }
}



const createProduct = async (id_producto,nombre,descripcion,cantidad_disponible,
    hora_venta_inicial,hora_venta_final,punto_encuentro,precio,estado,foto) => {

  try {
    const [product] = await (await conexion)
      .execute('INSERT INTO producto (id_producto,nombre,descripcion,cantidad_disponible,hora_venta_inicial,hora_venta_final,punto_encuentro,precio,estado,foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [id_producto,nombre,descripcion,cantidad_disponible,hora_venta_inicial,hora_venta_final,punto_encuentro,precio,estado,foto]);
    return product;
  } catch (error) {
    console.error('Error al intentar crear el producto:', error);
    throw error;
  }
}

const updateProduct = async (id_producto,nombre,descripcion,cantidad_disponible,hora_venta_inicial,hora_venta_final,punto_encuentro,precio,estado,foto) => {
  try {
    const [output] = await (await conexion)
      .execute('UPDATE producto SET nombre= ? descripcion= ?,cantidad_disponible= ?,hora_venta_inicial= ?,hora_venta_final= ?,punto_encuentro= ?,precio,estado= ?,foto= ? WHERE id_producto = ?',
        [id_producto,nombre,descripcion,cantidad_disponible,hora_venta_inicial,hora_venta_final,punto_encuentro,precio,estado,foto]);
    return output;
  } catch (error) {
    console.error('Error al intentar actualizar el producto:', error);
    throw error;
  }
}


module.exports = { 
  getAllProducts,
  getAllProductsByName,
  createProduct,
  updateProduct,
 }