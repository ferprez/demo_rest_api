// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) return next();

  // if they aren't redirect them to the home page
  res.status(403).json({ success: false, message: 'Debe autenticarse primero' });
}

module.exports = isLoggedIn;