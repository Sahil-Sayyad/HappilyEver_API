const express = require('express');
const router = express.Router();
const verifyToken = require("../middleware/validateToken");

const {login} = require('../controllers/userController');
const {allSessions, bookSession,listSessionPending} = require('../controllers/sessionController');

router.post('/auth/login', login);
router.get('/sessions/free', verifyToken, allSessions);
router.post('/sessions/book', verifyToken, bookSession);
router.get('/sessions/pending', verifyToken, listSessionPending);

module.exports = router;

// http://localhost:8000/auth/login  ---POST
// http://localhost:8000/sessions/free ---GET with token
// http://localhost:8000/sessions/book ---POST with token and request data
// http://localhost:8000/sessions/pending ---GET with token list for the warden B