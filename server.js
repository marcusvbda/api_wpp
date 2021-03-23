require("./bootstrap")
const express = require('express')
const app = express()
app.use(express.json())

app.use('/auth', require("@routes/auth"))
app.use('/admin', require("@routes/admin"))

const server_port = process.env.PORT
app.listen(server_port, () => {
	console.log(`Server running in http://localhost:${server_port}`)
})