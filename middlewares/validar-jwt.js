const{ request, response} = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req = request, res = response, next)=>{
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({msg:'No hay token en la petición'});
    }

    try{
        const{matricula} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        req.matricula = matricula;
        //console.log(uid);
        //aquí podemos obtener el usuario mediante el uid
        next();
    }catch(error){
        console.log(error);
        res.status(401).json({msg:'Token no válido'});
    }
}

module.exports = {validarJWT}