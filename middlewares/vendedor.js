const conexion = require('../config/conexion');

const getAllVendedor = async () => {
  try {
    const [rows, fields] = await (await conexion).execute('SELECT * FROM vendedor');
    return rows;
  } catch (error) {
    console.error('Error al obtener los vendedores:', error);
    throw error;
  }
}

const createVendedor = async (matricula,id_producto) => {

  try {
   
    const matriculaValida = matricula !== undefined ? matricula : null;
    const idProductoValido = id_producto !== undefined ? id_producto : null;

    // Utilizar los valores verificados en la consulta SQL
    const [vendedor] = await (await conexion)
      .execute('INSERT INTO vendedor (matricula, id_producto) VALUES (?, ?)',
        [matriculaValida, idProductoValido]);
    return vendedor;
  } catch (error) {
    console.error('Error al intentar crear vendedor:', error);
    throw error;
  }
}


const deleteVendedor = async (idVendedor) => {
    try {
      const [output] = await (await conexion)
        .execute('DELETE FROM vendedor WHERE idVendedor = ?',
          [idVendedor]);
      return output;
    } catch (error) {
      console.error('Error al intentar eliminar vendedor:', error);
      throw error;
    }
  }

  const getAllProductos = async (matricula) => {
    try {
     
      const [rows, fields] = await (await conexion).execute('SELECT p.* FROM producto p JOIN vendedor v ON p.id_producto = v.id_producto WHERE v.matricula = ?', [matricula]);
      return rows;
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw error;
    }
  }
module.exports = { 
  getAllVendedor,
  createVendedor,
  deleteVendedor,
  getAllProductos
 }