const conexion = require('../config/conexion');

const getAllEstudent = async () => {
  try {
    const [rows, fields] = await (await conexion).execute('SELECT * FROM estudiante');
    return rows;
  } catch (error) {
    console.error('Error al obtener los estudiantes:', error);
    throw error;
  }
}

const getAllEstudentById = async (matricula) => {
  try{
    const [rows, fields] = await (await conexion)
    
      .execute('SELECT * FROM estudiante WHERE matricula = ?', [matricula]);
    return rows[0];
  } catch (error) {
    console.error('Error al obtener el estudiante:', error);
    throw error;
  }
}

const getIdByCredentials = async (correoInstitucional, password) => {
  try {

    const [rows, fields] = await (await conexion)
      .execute('SELECT matricula, tipoVendedor, tipoComprador FROM estudiante WHERE  correoInstitucional= ? AND password= ?', [correoInstitucional, password]);
    if (rows.length > 0) {
      return rows;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error al obtener el estudiante:', error);
    throw error;
  }
}

const createEstudent = async (matricula, nombre, apellidoPaterno, apellidoMaterno, correoInstitucional, password, tipoVendedor,tipoComprador,fotoPerfil,fotoCredencial) => {
  try {
    const matriculaValida = matricula !== undefined ? matricula : null;
    const nombreValido = nombre !== undefined ? nombre : null;
    const apellidoPaternoValido = apellidoPaterno !== undefined ? apellidoPaterno : null;
    const apellidoMaternoValido = apellidoMaterno !== undefined ? apellidoMaterno : null;
    const correoInstitucionalValido = correoInstitucional !== undefined ? correoInstitucional : null;
    const passwordValida = password !== undefined ? password : null;
    const tipoVendedorValido = tipoVendedor !== undefined ? tipoVendedor : null;
    const tipoCompradorValido = tipoComprador !== undefined ? tipoComprador : null;
    const fotoPerfilValida = fotoPerfil !== undefined ? fotoPerfil : null;
    const fotoCredencialValida = fotoCredencial !== undefined ? fotoCredencial : null;

    // Utilizar los valores verificados en la consulta SQL
    const [estudiante] = await (await conexion)
      .execute('INSERT INTO estudiante (matricula, nombre, apellidoPaterno, apellidoMaterno, correoInstitucional, password, tipoVendedor, tipoComprador, fotoPerfil, fotoCredencial) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [matriculaValida, nombreValido, apellidoPaternoValido, apellidoMaternoValido, correoInstitucionalValido, passwordValida, tipoVendedorValido, tipoCompradorValido, fotoPerfilValida, fotoCredencialValida]);
    return estudiante;

  } catch (error) {
    console.error('Error al intentar crear el cuenta:', error);
    throw error;
  }
}

const updateEstudent = async (matricula, nombre, apellidoPaterno, apellidoMaterno, correoInstitucional, password, fotoPerfil,fotoCredencial) => {
  try {
    const [output] = await (await conexion)
      .execute('UPDATE estudiante SET nombre= ? , apellidoPaterno= ?, apellidoMaterno= ?, correoInstitucional= ?, password= ?,fotoPerfil= ?,fotoCredencial= ? WHERE matricula = ?',
        [matricula, nombre, apellidoPaterno, apellidoMaterno, correoInstitucional, password, fotoPerfil,fotoCredencial]);
    return output;
  } catch (error) {
    console.error('Error al intentar actualizar cuenta:', error);
    throw error;
  }
}

const deleteEstudent = async (matricula) => {
  try {
    const [output] = await (await conexion)
      .execute('DELETE FROM estudiante WHERE matricula = ?',
        [matricula]);
    return output;
  } catch (error) {
    console.error('Error al intentar eliminar cuenta:', error);
    throw error;
  }
}

module.exports = { 
  getAllEstudent,
  getAllEstudentById, 
  getIdByCredentials, 
  createEstudent,
  updateEstudent,
  deleteEstudent
 }