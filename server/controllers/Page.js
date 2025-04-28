
// controller for rendering pages
const loginPage = (req, res) => res.render('login');
const signupPage = (req, res) => res.render('signup');
const homePage = (req, res) => res.render('home');

module.exports = {
  login: loginPage,
  signup: signupPage,
  home: homePage,
};
