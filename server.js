const express = require('express')
const cors = require("cors")
const colors = require("colors")
const morgan = require("morgan")
const dotenv = require("dotenv")
const connectDB = require('./config/db')


// DOTENV CONFIG

dotenv.config()

// MOGODB CONNECTION

connectDB();

// REST OBJECT 

const app = express()

// MIDDLE WARE

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//ROUTES
//// Default Routes Here
// app.get("",(req, res) => {
//     res.status(200).json({
//         success: true,
//         message: "Welcome to FullStack Application ",
//     });
// });

app.use('/api/v1/auth', require('./routes/userRoutes'))
app.use('/api/v1/post', require('./routes/postRoutes'))

// Home
app.get("/", req, res)=>{
    res.status(200).send({
        "success":true,
        "message":"Node Server Running On"
    })
}

//PORT 

const PORT = process.env.PORT || 8080


// LISTEN

app.listen(PORT,()=>{
    console.log(`Server Running On ${PORT}`.bgGreen.white)
})
