const conexion = require('../config/conexion');

const getAllEstudent = async () => {
  try {
    const [rows, fields] = await (await conexion).execute('SELECT * FROM estudiantes');
    return rows;
  } catch (error) {
    console.error('Error al obtener los estudiantes:', error);
    throw error;
  }
}

const getAllEstudentById = async (matricula) => {
  try {
    const [rows, fields] = await (await conexion)
      .execute('SELECT * FROM estudiantes WHERE matricula = ?', [matricula]);
    return rows;
  } catch (error) {
    console.error('Error al obtener el estudiante:', error);
    throw error;
  }
}

const getIdByCredentials = async (correo_institucional, password) => {
  try {

    const [rows, fields] = await (await conexion)
      .execute('SELECT id FROM estudiantes WHERE  correo_institucional= ? AND password= ?', [correo_institucional, password]);
    if (rows.length > 0) {
      return rows[0].matricula;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error al obtener el estudiante:', error);
    throw error;
  }
}

const createEstudent = async (matricula, nombre, apellido_paterno, apellido_materno, correo_institucional, password) => {
  try {
    const [student] = await (await conexion)
      .execute('INSERT INTO estudiantes (matricula, nombre, apellido_paterno, apellido_materno, correo_institucional, password) VALUES (?, ?, ?, ?, ?, ?)',
        [matricula, nombre, apellido_paterno, apellido_materno, correo_institucional, password]);
    return student;
  } catch (error) {
    console.error('Error al intentar crear el cuenta:', error);
    throw error;
  }
}

const updateEstudent = async (matricula, nombre, apellido_paterno, apellido_materno, correo_institucional, password) => {
  try {
    const [output] = await (await conexion)
      .execute('UPDATE estudiantes SET nombre= ? , apellido_paterno= ?, apellido_materno= ?, correo_institucional= ?, password= ? WHERE matricula = ?',
        [matricula, nombre, apellido_paterno, apellido_materno, correo_institucional, password]);
    return output;
  } catch (error) {
    console.error('Error al intentar actualizar cuenta:', error);
    throw error;
  }
}

const deleteEstudent = async (matricula) => {
  try {
    const [output] = await (await conexion)
      .execute('DELETE FROM estudiantes WHERE matricula = ?',
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