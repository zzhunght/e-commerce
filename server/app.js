const express = require('express')
const cors = require('cors')

const app = express()

app.get('/',(req,res) =>{
    res.send('hung pro')
})



app.listen(3000, ()=> console.log(`App listening on port 3000`))