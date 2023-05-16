const router = require('express').Router() //Objeto enrutador de express

router.post('/create-order', (req,res)=>{
    const body = req.body
    console.log(body)
    res.json(body)
})

module.exports = router //Retornamos el objeto enrutador