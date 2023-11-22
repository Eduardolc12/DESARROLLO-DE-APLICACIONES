const jwt = require('jsonwebtoken');

const generarJWT = (matricula = '' )=>{
    return new Promise((resolve, reject)=>{
        const payload = {matricula};
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{
            expiresIn: '4h'
        },
        (err,token)=>{
            if(err){
                reject('No se pudo generar token');
            }else{
                resolve(token);
            }
        })
    })
}

module.exports={
    generarJWT
}