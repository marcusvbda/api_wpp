require('dotenv').config()
const jwt = require("jsonwebtoken")
const express = require('express')
const app = express()
app.use(express.json())

const verifyJWT = (req, res, next) => {
	const token = req.headers["authorization"]
	if (!token) res.sendStatus(403)
	const splited = token.split(' ')
	if (splited[0].trim().toLowerCase() != "bearer") res.sendStatus(403)
	if (!splited[1]) res.sendStatus(403)
	try {
		jwt.verify(splited[1], process.env.SECRET_KEY, (er, decoded) => {
			if (er) res.sendStatus(403)
			req.user = decoded
			next()
		})
	} catch (er) {
		console.log("bbbb")
		console.log(er)
		res.sendStatus(403)
	}
}

app.post('/', verifyJWT, (req, res) => {
	res.status(202).json(req.user)
})

app.post('/auth', (req, res) => {
	//valida usuarios 


	//cria token
	let user = {
		key: req.body.key,
		secret: req.body.secret
	}
	let token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '1h' })
	res.status(202).json({ token })
})


app.listen(3000)