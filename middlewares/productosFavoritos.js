const conexion = require('../config/conexion');

const getAllFavProducts = async () => {
  try {
    const [rows, fields] = await (await conexion).execute('SELECT * FROM productosfavoritos');
    return rows;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
}

const createFavProduct = async (idFavoritos,matricula,id_producto) => {

  try {
    const idFavoritoValido = id_favorito !== undefined ? id_favorito : null;
    const matriculaValida = matricula !== undefined ? matricula : null;
    const idProductoValido = id_producto !== undefined ? id_producto : null;

    // Utilizar los valores verificados en la consulta SQL
    const [product] = await (await conexion)
      .execute('INSERT INTO productosfavoritos (id_favorito, matricula, id_producto) VALUES (?, ?, ?)',
        [idFavoritoValido, matriculaValida, idProductoValido]);
   
    return product;
  } catch (error) {
    console.error('Error al intentar crear el producto:', error);
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
  createFavProduct,
  deleteFavProduct,
 }