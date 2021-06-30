const router = require('express').Router()
const {login, register} = require('../controllers/userController')

// localhost:4000/api/users/
router.post('/register', register)

router.post('/login',login)

module.exports = router