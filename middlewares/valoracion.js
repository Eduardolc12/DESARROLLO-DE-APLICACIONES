const conexion = require('../config/conexion');

const getAllValoracion = async () => {
  try {
    const [rows, fields] = await (await conexion).execute('SELECT * FROM valoracion');
    return rows;
  } catch (error) {
    console.error('Error al obtener la valoración:', error);
    throw error;
  }
}





const createValoracion = async (id_valoracion,descripcion,calificacion) => {

  try {
    const [qualification] = await (await conexion)
      .execute('INSERT INTO producto (id_valoracion,descripcion,calificacion) VALUES (?, ?, ?)',
        [id_valoracion,descripcion,calificacion]);
    return qualification;
  } catch (error) {
    console.error('Error al intentar hacer valoracción:', error);
    throw error;
  }
}

const updateValoracion = async (id_valoracion,descripcion,calificacion) => {
  try {
    const [output] = await (await conexion)
      .execute('UPDATE producto SET descripcion  = ?,calificacion = ? WHERE id_valoracion = ?',
        [id_valoracion,descripcion,calificacion]);
    return output;
  } catch (error) {
    console.error('Error al intentar actualizar valoración:', error);
    throw error;
  }
}


module.exports = { 
  getAllValoracion,
  createValoracion,
  updateValoracion,
 }