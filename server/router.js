const express = require('express');
const { createPost, getAllPosts, beepPost, boopPost, deletePost } = require('./controllers/postController');
const { requiresLogin } = require('./middleware/auth');
const authController = require('./controllers/auth'); 
const { upgradeToPremium } = require('./controllers/premiumController');


const router = express.Router();

// base route
router.get('/', requiresLogin, (req, res) => {
  res.render('home'); 
});

// post routes (but not like POST, post routes for like, posts)
router.get('/posts', getAllPosts);          
router.post('/post', requiresLogin, createPost); 

// beeps, boops, and delete
router.post('/post/:id/beep', requiresLogin, beepPost);  
router.post('/post/:id/boop', requiresLogin, boopPost);  
router.delete('/post/:id', requiresLogin, deletePost);   

// routes for authentication
router.get('/login', authController.loginPage);
router.post('/login', authController.login);
router.get('/signup', authController.signupPage);
router.post('/signup', authController.signup);
router.get('/logout', authController.logout);

// upgrade to premium
router.post('/premium', requiresLogin, upgradeToPremium);

// password change
router.post('/change-password', requiresLogin, authController.changePassword);

module.exports = router;

