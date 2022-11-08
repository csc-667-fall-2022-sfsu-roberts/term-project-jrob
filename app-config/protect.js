const protect = (request, response, next) => {
  if (request.session.authenticated) {
    next();
  } else {
    response.redirect("/auth/login");
  }
};

module.exports = protect;
