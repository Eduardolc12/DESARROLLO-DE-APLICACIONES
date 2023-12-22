const { request, response } = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const crypto = require('crypto-js');
const dao = require('../middlewares/estudiante');

const estudiantesGet = async (req, res = response) => {
  const estudents = await dao.getAllEstudent();
  res.send(estudents)

}

const estudiantesGetById = async (req, res = response) => {
  const { matricula } = req.params;
  const estudiante = await dao.getAllEstudentById(matricula);
  res.json({
   
    estudiante

  });
}

const estudiantesLogin = async (req, res = response) => {
  const { correoInstitucional, password } = req.body;
  const passcipher = crypto.MD5(password);
  const student = await dao.getIdByCredentials(correoInstitucional, passcipher.toString());
  if ( student== null) {
    res.status(404).json({ msg: "verifique sus credenciales de acceso" });
  }
  try {
    const token = await generarJWT(student);
    res.header('Authorization', `Bearer ${token}`);
    res.json({
      student,
      msg: "Usuario logueado correctamente"
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "verifique sus credenciales de acceso" });
  }

}

const estudiantesCreate = async (req, res = response) => {
  const { matricula, nombre, apellidoPaterno, apellidoMaterno, correoInstitucional, password,  tipoVendedor,tipoComprador,fotoPerfil,fotoCredencial} = req.body;
  try {
    const estudiante = await dao.createEstudent(matricula, nombre, apellidoPaterno, apellidoMaterno, correoInstitucional, password, tipoVendedor,tipoComprador,fotoPerfil,fotoCredencial );
    const idGenerated = matricula;
    res.json({
      matricula: idGenerated
    });
  } catch (error) {
    res.status(500).json({ msg: "Error al crear el cuenta" });
    
  }
}

const estudiantesUpdate = async (req, res) => {
  const { matricula } = req.params;
  try {
    const { nombre, apellidoPaterno, apellidoMaterno, correoInstitucional, password ,  tipoVendedor,tipoComprador,fotoPerfil,fotoCredencial} = req.body;
   
    const output = await dao.updateEstudent(nombre, apellidoPaterno, apellidoMaterno, correoInstitucional, password,  tipoVendedor,tipoComprador,fotoPerfil,fotoCredencial);
    res.json({
      msg: "Datos del estudiante actualizados",
      matricula,
      affectedRows: output.affectedRows
    });
  }
  catch (error) {
    res.status(500).json({ msg: "Error al actualizar el estudiante" });
  }
}
const estudiantesUpdatePass = async (req, res) => {
  const { matricula } = req.params;
  try {
    const cifrada = crypto.MD5(newpass);
    const output = await dao.createEstudent(matricula, cifrada.toString());
    res.json({
      msg: "Password actualizado",
      id,
      affectedRows: output.affectedRows
    });
  }
  catch (error) {
    res.status(500).json({ msg: "Error al cambiar contraseña" });
  }
}

const estudiantesDelete = async (req, res) => {
  const { matricula } = req.params;
  try {
    const output = await dao.deleteEstudent(matricula);
    res.json({
      msg: "Usuario eliminado",
      affectedRows: output.affectedRows
    });
  }
  catch (error) {
    res.status(500).json({ msg: "Error al eliminar el usuario" });
  }
}

module.exports = {
  estudiantesGet,
  estudiantesGetById,
  estudiantesLogin,
  estudiantesCreate,
  estudiantesUpdate,
  estudiantesUpdatePass,
  estudiantesDelete
};