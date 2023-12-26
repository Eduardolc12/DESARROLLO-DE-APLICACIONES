const multer =require('multer');

const storage = multer.diskStorage({
destination: (req,file,cb)=>{
    cb(null,'./imagenes')
},
filename: (req ,file, cb)=>{
const ext = file.originalname.split('.').pop()
const fileD= file.originalname.replace(/\.[^/.]+$/, '');
cb(null,`${fileD}.${ext}`)

}
})

const imagen = multer({ storage})

module.exports ={imagen};