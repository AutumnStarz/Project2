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

// logout
const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};

// change password
const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ error: 'Both old and new passwords are required.' });
  }

  try {
    const user = await User.findById(req.session.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const isMatch = await user.comparePassword(oldPassword);

    if (!isMatch) {
      return res.status(400).json({ error: 'Old password is incorrect.' });
    }

    user.password = newPassword; 
    await user.save();

    return res.json({ message: 'Password changed successfully.' });
  } catch (err) {
    console.error('Error changing password:', err);
    return res.status(500).json({ error: 'An error occurred while changing the password.' });
  }
};

module.exports = {
  loginPage,
  signupPage,
  login,
  signup,
  logout,
  changePassword,
};
