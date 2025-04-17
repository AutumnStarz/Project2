// check if user is logged in
const requiresLogin = (req, res, next) => {
    if (!req.session.userId) return res.redirect('/login');
    return next();
  };
  
  module.exports = {
    requiresLogin,
  };
  