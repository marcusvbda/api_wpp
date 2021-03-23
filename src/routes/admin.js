const { verifyJWT } = require("@middlewares/jwt")
const express = require('express')
const router = express()
router.use(express.json())

router.post('/teste', verifyJWT, (req, res) => {
	res.status(202).send("is logged")
})

module.exports = router