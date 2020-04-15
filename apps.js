const express = require('express')
const morgan = require('morgan')

const app = express()

app.get('/', (req, res) => {
    res.json({
        massage: 'Welcome to new blog'
    })
})

const PORT = process.env.PORT || 8090

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
