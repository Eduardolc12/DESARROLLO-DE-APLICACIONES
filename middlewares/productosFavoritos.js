const conexion = require('../config/conexion');

const getAllFavProducts = async (matricula) => {
  try {
    const [rows, fields] = await (await conexion).execute('SELECT pf.*, pr.* FROM productosfavoritos pf JOIN estudiante e ON pf.matricula = e.matricula JOIN producto pr ON pf.id_producto = pr.id_producto WHERE e.matricula = ?', [matricula]);
    return rows;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
}


const getAllFav = async (id_producto) => {
  try {
    const [rows, fields] = await (await conexion).execute('SELECT * FROM productosfavoritos WHERE id_producto = ?', [id_producto]);
    return rows[0];
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
}



const createFavProduct = async (matricula,id_producto) => {

  try {
 
    const matriculaValida = matricula !== undefined ? matricula : null;
    const idProductoValido = id_producto !== undefined ? id_producto : null;

    // Utilizar los valores verificados en la consulta SQL
    const [product] = await (await conexion)
      .execute('INSERT INTO productosfavoritos (matricula,id_producto) VALUES (?, ?)',
        [matriculaValida, idProductoValido]);
     return product;
  } catch (error) {
    console.error('Error al intentar agregar el producto favvorito:', error);
    throw error;
  }
}


const deleteFavProduct = async (idFavoritos) => {
    try {
      const [output] = await (await conexion)
        .execute('DELETE FROM productosfavoritos WHERE idFavoritos = ?',
          [idFavoritos]);
      return output;
    } catch (error) {
      console.error('Error al intentar eliminar favorito:', error);
      throw error;
    }
  }


module.exports = { 
  getAllFavProducts,
  getAllFav,
  createFavProduct,
  deleteFavProduct,
 }