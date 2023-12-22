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
    const idValoracionValido = id_valoracion !== undefined ? id_valoracion : null;
    const descripcionValida = descripcion !== undefined ? descripcion : null;
    const calificacionValida = calificacion !== undefined ? calificacion : null;

    // Utilizar los valores verificados en la consulta SQL
    const [qualification] = await (await conexion)
      .execute('INSERT INTO producto (id_valoracion, descripcion, calificacion) VALUES (?, ?, ?)',
        [idValoracionValido, descripcionValida, calificacionValida]);
    return qualification;
  } catch (error) {
    console.error('Error al intentar hacer valoracción:', error);
    throw error;
  }
}

const updateValoracion = async (id_valoracion,descripcion,calificacion) => {
  try {
    const idValoracionValido = id_valoracion !== undefined ? id_valoracion : null;
    const descripcionValida = descripcion !== undefined ? descripcion : null;
    const calificacionValida = calificacion !== undefined ? calificacion : null;

    // Utilizar los valores verificados en la consulta SQL
    const [qualification] = await (await conexion)
      .execute('UPDATE producto SET descripcion = ?, calificacion = ? WHERE id_valoracion = ?',
        [descripcionValida, calificacionValida, idValoracionValido]);
    return qualification;
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