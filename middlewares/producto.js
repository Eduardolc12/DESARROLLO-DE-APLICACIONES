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

const getAllProductsByName = async (nombre,matricula) => {
  try {
    const [rows, fields] = await (await conexion)
    .execute('SELECT pr.* FROM producto pr JOIN vendedor v ON pr.id_producto = v.id_producto JOIN estudiante e ON v.matricula = e.matricula WHERE e.matricula = ? AND pr.nombre = ?',[ matricula, nombre]);
      return rows[0];
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    throw error;
  }
}

const getProductByName = async (nombre) => {
  try {
    const [rows, fields] = await (await conexion)
    .execute('SELECT * FROM producto WHERE nombre = ?',[nombre]);
      return rows[0];
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    throw error;
  }
}

const getProductById = async (id_producto) => {
  try {
   
    const [rows, fields] = await (await conexion)
    .execute('SELECT * FROM producto WHERE id_producto = ?',[id_producto]);
      return rows[0];
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    throw error;
  }
}

const createProduct = async ( nombre,descripcion,cantidadDisponible,
  horaVentaInicial,horaVentaFinal,puntoEncuentro,precio,estado,foto) => {

  try {

  
    const nombreValido = nombre !== undefined ? nombre : null;
    const descripcionValida = descripcion !== undefined ? descripcion : null;
    const cantidadDisponibleValida = cantidadDisponible !== undefined ? cantidadDisponible : null;
    const horaVentaInicialValida = horaVentaInicial !== undefined ? horaVentaInicial : null;
    const horaVentaFinalValida = horaVentaFinal !== undefined ? horaVentaFinal : null;
    const puntoEncuentroValido = puntoEncuentro !== undefined ? puntoEncuentro : null;
    const precioValido = precio !== undefined ? precio : null;
    const estadoValido = estado !== undefined ? estado : null;
    const fotoValida = foto !== undefined ? foto : null;

    // Utilizar los valores verificados en la consulta SQL
    const [producto] = await (await conexion)
      .execute('INSERT INTO producto ( nombre, descripcion, cantidadDisponible, horaVentaInicial, horaVentaFinal, puntoEncuentro, precio, estado, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [ nombreValido, descripcionValida, cantidadDisponibleValida, horaVentaInicialValida, horaVentaFinalValida, puntoEncuentroValido, precioValido, estadoValido, fotoValida]);
   
     return producto;
  } catch (error) {
    console.error('Error al intentar crear el producto:', error);
    throw error;
  }
}

const updateProduct = async (id_producto,nombre,descripcion,cantidadDisponible,horaVentaInicial,horaVentaFinal,puntoEncuentro,precio,estado,foto) => {
  try {
    const idProductoValido = id_producto !== undefined ? id_producto : null;
    const nombreValido = nombre !== undefined ? nombre : null;
    const descripcionValida = descripcion !== undefined ? descripcion : null;
    const cantidadDisponibleValida = cantidadDisponible !== undefined ? cantidadDisponible : null;
    const horaVentaInicialValida = horaVentaInicial !== undefined ? horaVentaInicial : null;
    const horaVentaFinalValida = horaVentaFinal !== undefined ? horaVentaFinal : null;
    const puntoEncuentroValido = puntoEncuentro !== undefined ? puntoEncuentro : null;
    const precioValido = precio !== undefined ? precio : null;
    const estadoValido = estado !== undefined ? estado : null;
    const fotoValida = foto !== undefined ? foto : null;

    // Utilizar los valores verificados en la consulta SQL
    const [producto] = await (await conexion)
      .execute('UPDATE producto SET nombre= ?, descripcion= ?, cantidadDisponible= ?, horaVentaInicial= ?, horaVentaFinal= ?, puntoEncuentro= ?, precio= ?, estado= ?, foto= ? WHERE id_producto = ?',
        [nombreValido, descripcionValida, cantidadDisponibleValida, horaVentaInicialValida, horaVentaFinalValida, puntoEncuentroValido, precioValido, estadoValido, fotoValida, idProductoValido]);
       
        return producto;
    
      
     
  } catch (error) {
    console.error('Error al intentar actualizar el producto:', error);
    throw error;
  }
}

const deleteProduct = async (id_producto) => {
  try {
    const [producto] = await (await conexion)
      .execute('DELETE FROM producto WHERE id_producto = ?',
        [id_producto]);
    return producto;
  } catch (error) {
    console.error('Error al intentar eliminar cuenta:', error);
    throw error;
  }
}

module.exports = { 
  getAllProducts,
  getAllProductsByName,
  getProductById,
  getProductByName,
  createProduct,
  updateProduct,
  deleteProduct
 }