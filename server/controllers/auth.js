const User = require('../models/User');

const loginPage = (req, res) => {
  res.render('login');
};

const signupPage = (req, res) => {
  res.render('signup');
};

// login
const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).render('login', { error: 'Invalid login.' });
  }
  req.session.userId = user._id;
  return res.redirect('/');
};

// signup
const signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = new User({ username, password });
    await newUser.save();
    req.session.userId = newUser._id;
    return res.redirect('/');
  } catch (err) {
    return res.status(400).render('signup', { error: 'Username may already be taken.' });
  }
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};

module.exports = {
  loginPage,
  signupPage,
  login,
  signup,
  logout,
};
