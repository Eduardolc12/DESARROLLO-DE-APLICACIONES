const conexion = require('../config/conexion');
const bcrypt = require('bcrypt');
const pepper = process.env.PEPPER;

const getAllStudents = async () => {
  try {
    const [rows, fields] = await (await conexion).execute('SELECT * FROM estudiante');
    return rows;
  } catch (error) {
    console.error('Error al obtener los estudiantes:', error);
    throw error;
  }
}

const getAllStudentsById = async (matricula) => {
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
    const correoInstitucionalValido = correoInstitucional !== undefined ? correoInstitucional : null;
    const passwordValida = password !== undefined ? password : null;
    const [rows, fields] = await (await conexion)
      .execute('SELECT matricula, nombre, apellidoPaterno, apellidoMaterno, correoInstitucional, password, tipoVendedor, tipoComprador FROM estudiante WHERE  correoInstitucional= ?', [correoInstitucionalValido]);
    
    if (rows.length > 0) {
      const user = rows[0];
      if (user && user.password) { 
        const hashedPassword = user.password;

        const isPasswordValid = await bcrypt.compare(pepper + passwordValida, hashedPassword);
        if (isPasswordValid) {
          return user;
        } else {
          return null;
        }
      } else {
        return null; 
      }
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error al obtener el estudiante:', error);
    throw error;
  }
};


const createStudent = async (matricula, nombre, apellidoPaterno, apellidoMaterno, correoInstitucional, password, tipoVendedor,tipoComprador,fotoPerfil,fotoCredencial) => {
  try {
    const matriculaValida = matricula !== undefined ? matricula : null;
    const nombreValido = nombre !== undefined ? nombre : null;
    const apellidoPaternoValido = apellidoPaterno !== undefined ? apellidoPaterno : null;
    const apellidoMaternoValido = apellidoMaterno !== undefined ? apellidoMaterno : null;
    const correoInstitucionalValido = correoInstitucional !== undefined ? correoInstitucional : null;
    const tipoVendedorValido = tipoVendedor !== undefined ? tipoVendedor : null;
    const tipoCompradorValido = tipoComprador !== undefined ? tipoComprador : null;
    const fotoPerfilValida = fotoPerfil !== undefined ? fotoPerfil : null;
    const fotoCredencialValida = fotoCredencial !== undefined ? fotoCredencial : null;

    const passwordValida = bcrypt.hashSync(pepper + password, 10);

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

const updateStudent = async (matricula, nombre, apellidoPaterno, apellidoMaterno, correoInstitucional, password,tipoVendedor,tipoComprador, fotoPerfil,fotoCredencial) => {
  try {
    const matriculaValida = matricula !== undefined ? matricula : null;
    const nombreValido = nombre !== undefined ? nombre : null;
    const apellidoPaternoValido = apellidoPaterno !== undefined ? apellidoPaterno : null;
    const apellidoMaternoValido = apellidoMaterno !== undefined ? apellidoMaterno : null;
    const correoInstitucionalValido = correoInstitucional !== undefined ? correoInstitucional : null;
    const tipoVendedorValido = tipoVendedor !== undefined ? tipoVendedor : null;
    const tipoCompradorValido = tipoComprador !== undefined ? tipoComprador : null;
    const fotoPerfilValida = fotoPerfil !== undefined ? fotoPerfil : null;
    const fotoCredencialValida = fotoCredencial !== undefined ? fotoCredencial : null;

    const passwordValida = bcrypt.hashSync(pepper + password, 10);

    const [estudiante] = await (await conexion)
      .execute('UPDATE estudiante SET nombre= ? , apellidoPaterno= ?, apellidoMaterno= ?, correoInstitucional= ?, password= ?,  tipoVendedor= ?,tipoComprador=?,fotoPerfil= ?,fotoCredencial= ? WHERE matricula = ?',
      [ nombreValido, apellidoPaternoValido, apellidoMaternoValido, correoInstitucionalValido, passwordValida, tipoVendedorValido, tipoCompradorValido, fotoPerfilValida, fotoCredencialValida,matriculaValida]);
      return estudiante;
  
  } catch (error) {
    console.error('Error al intentar actualizar cuenta:', error);
    throw error;
  }
}

const deleteStudent = async (matricula) => {
  try {
    const [estudiante] = await (await conexion)
      .execute('DELETE FROM estudiante WHERE matricula = ?',
        [matricula]);
    return estudiante;
  } catch (error) {
    console.error('Error al intentar eliminar cuenta:', error);
    throw error;
  }
}

module.exports = { 
  getAllEstudent: getAllStudents,
  getAllEstudentById: getAllStudentsById, 
  getIdByCredentials, 
  createEstudent: createStudent,
  updateEstudent: updateStudent,
  deleteEstudent: deleteStudent
 }