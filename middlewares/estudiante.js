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
   
    const [student] = await (await conexion)
      .execute('INSERT INTO estudiante (matricula, nombre, apellidoPaterno, apellidoMaterno, correoInstitucional, password, tipoVendedor, tipoComprador,fotoPerfil,fotoCredencial) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [matricula, nombre, apellidoPaterno, apellidoMaterno, correoInstitucional, password, tipoVendedor, tipoComprador,fotoPerfil,fotoCredencial ]);
    return student;
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