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

    const [salesPerson] = await (await conexion)
      .execute('INSERT INTO comprador (idComprador,matricula,id_producto) VALUES (?, ?, ?)',
        [idComprador,matricula,id_producto]);
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