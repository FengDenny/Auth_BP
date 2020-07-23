const express = require('express')
const userRoutes = require('./routes/userRoutes')

const app = express();

// Body Parser START
app.use(express.json({
    limit: '10kb'
}))

app.use(express.urlencoded({
    extended: true,
    limit: '10kb'
}))

// Body Parser END


// Routes

app.use('/api/users', userRoutes)



module.exports = app;