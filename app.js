const express = require('express')

const app = express()

const port=3000;

app.get('/',(res,req)=>{

})


app.listen(port,()=>{
    console.log(`App is running on port:${port}`)
})