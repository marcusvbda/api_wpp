const { verifyJWT } = require("@middlewares/jwt")
const express = require('express')
const router = express()
router.use(express.json())

router.post('/', (req, res) => {
	//valida usuarios 

	//cria token
	let user = {
		key: req.body.key,
		secret: req.body.secret
	}
	let token = createToken(user)
	res.status(202).json({ token })
})

router.post('/check', verifyJWT, (req, res) => {
	if (!req.user) return res.sendStatus(403)
	res.status(202).json(req.user)
})

module.exports = router