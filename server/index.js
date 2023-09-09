const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(201).send('<h1>Welcome to BuyTix</h1>')
})

// Import Router
const { usersRouter, ticketsRouter } = require('./routers')
app.use('/users', usersRouter)
app.use('/tickets', ticketsRouter)
app.listen(PORT, () => console.log(`API Running on Port ${PORT}`))

// Centralized Error
app.use((err, req, res, next) => {
    const statusCode = err.status || 500
    const statusMessage = err.message || 'Error'

    return res.status(statusCode).send({
        isError: true,
        message: statusMessage,
        data: null
    })
})
