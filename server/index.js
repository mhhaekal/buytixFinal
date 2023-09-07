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
const { usersRouter } = require('./routers')
app.use('/users', usersRouter)
app.listen(PORT, () => console.log(`API Running on Port ${PORT}`))