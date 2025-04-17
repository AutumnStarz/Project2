const express = require('express');
const auth = require('./controllers/auth');
const { createPost, getAllPosts } = require('./controllers/postController');
const { requiresLogin } = require('./middleware/auth');

const router = express.Router();

// routes
router.get('/login', auth.loginPage);
router.post('/login', auth.login);
router.get('/signup', auth.signupPage);
router.post('/signup', auth.signup);
router.get('/logout', auth.logout);
router.post('/post', createPost);
router.get('/posts', getAllPosts);


router.get('/', requiresLogin, (req, res) => {
    res.render('home');
});


module.exports = router;
