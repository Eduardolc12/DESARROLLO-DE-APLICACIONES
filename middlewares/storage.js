const multer = require('multer');

// Configuración del límite de tamaño en bytes (aquí está configurado en 10 MB, pero puedes ajustarlo según tus necesidades)
const maxSize = 10 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './imagenes');
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    const fileD = file.originalname.replace(/\.[^/.]+$/, '');
    cb(null, `${fileD}.${ext}`);
  },
});

const imagen = multer({
  storage,
  limits: { fileSize: maxSize }, // Establece el límite de tamaño aquí
});

module.exports = { imagen };
