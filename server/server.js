// Imports
const express = require('express');
const app = express();
const cors = require('cors');

// Middleware 
app.use(cors())

// Conexion
app.listen(5000, () => {
    console.log('server listening on port 5000')
})
