const {Router} = require('express');
const {
    estudiantesGet,
    estudiantesGetById,
    estudiantesLogin,
    estudiantesCreate,
    estudiantesUpdate,
    estudiantesUpdatePass,
    estudiantesDelete
} = require('../controllers/estudiante');
const{ validarJWT } = require('../middlewares/validar-jwt');
const{imagen} =require('../middlewares/storage');
const router = Router();

router.post('/login', estudiantesLogin);

router.get('/all', estudiantesGet);

router.get('/:matricula', estudiantesGetById);

router.post('/',imagen.single('fotoCredencial'),estudiantesCreate);

router.put('/:matricula',estudiantesUpdate);

router.patch('/:matricula',estudiantesUpdatePass);

router.delete('/:matricula', estudiantesDelete);


module.exports = router;
