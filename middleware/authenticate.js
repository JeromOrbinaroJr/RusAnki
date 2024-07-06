const authenticate = (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/auth-required');
    }
  };
  
  module.exports = authenticate;
  