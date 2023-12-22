const conexion = require('../config/conexion');

const getAllComprador = async () => {
  try {
    const [rows, fields] = await (await conexion).execute('SELECT * FROM comprador');
    return rows;
  } catch (error) {
    console.error('Error al obtener los compradores:', error);
    throw error;
  }
}

const createComprador = async (idComprador,matricula,id_producto) => {

  try {

    const idCompradorValido = idComprador !== undefined ? idComprador : null;
    const matriculaValida = matricula !== undefined ? matricula : null;
    const idProductoValido = id_producto !== undefined ? id_producto : null;

    // Utilizar los valores verificados en la consulta SQL
    const [salesPerson] = await (await conexion)
      .execute('INSERT INTO comprador (idComprador, matricula, id_producto) VALUES (?, ?, ?)',
        [idCompradorValido, matriculaValida, idProductoValido]);
    return salesPerson;
  } catch (error) {
    console.error('Error al intentar crear Comprador:', error);
    throw error;
  }
}


const deleteComprador = async (idComprador) => {
    try {
      const [salesPerson] = await (await conexion)
        .execute('DELETE FROM comprador WHERE idComprador = ?',
          [idComprador]);
      return salesPerson;
    } catch (error) {
      console.error('Error al intentar eliminar comprador:', error);
      throw error;
    }
  }


module.exports = { 
  getAllComprador,
  createComprador,
  deleteComprador
 }