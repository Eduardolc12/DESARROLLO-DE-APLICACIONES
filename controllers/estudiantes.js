const { request, response } = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const crypto = require("crypto-js");
const dao = require('../middlewares/estudiantes');

const estudiantesGet = async (req, res = response) => {
  const estudents = await dao.getAllEstudent();
  res.send(estudents)
  /*
  res.json({
    users
  });
  */
}

const estudiantesGetById = async (req, res = response) => {
  const { matricula } = req.params;
  const student = await dao.getAllUserById(matricula);
  res.json({
    student
  });
}

const estudiantesLogin = async (req, res = response) => {
  const { correo_institucional, password } = req.body;
  const passcipher = crypto.MD5(password);
  const matricula = await dao.getIdByCredentials(correo_institucional, passcipher.toString());
  if ( matricula== null) {
    res.status(404).json({ msg: "verifique sus credenciales de acceso" });
  }
  try {
    const token = await generarJWT(matricula);
    res.header('Authorization', `Bearer ${token}`);
    res.json({
      msg: "Usuario logueado correctamente"
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "verifique sus credenciales de acceso" });
  }

}

const estudiantesCreate = async (req, res = response) => {
  const { matricula, nombre, apellido_paterno, apellido_materno, correo_institucional, password } = req.body;
  try {
    const cifrada = crypto.MD5(password);
    const student = await dao.createUser(matricula, nombre, apellido_paterno, apellido_materno, correo_institucional, cifrada.toString());
    const idGenerated = student.matricula;
    res.json({
      id: idGenerated
    });
  } catch (error) {
    res.status(500).json({ msg: "Error al crear el cuenta" });
  }
}

const estudiantesUpdate = async (req, res) => {
  const { matricula } = req.params;
  try {
    const { nombre, apellido_paterno, apellido_materno, correo_institucional, password } = req.body;
    const cifrada = crypto.MD5(password);
    const output = await dao.updateUser(nombre, apellido_paterno, apellido_materno, correo_institucional, cifrada.toString());
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
    const output = await dao.createUser(matricula, cifrada.toString());
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
    const output = await dao.deleteUser(matricula);
    res.json({
      msg: "Usuario eliminado",
      id,
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