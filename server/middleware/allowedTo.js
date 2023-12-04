module.exports = (...roles) => {
  //   console.log(roles);
  return async (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      console.log(req);
      return res.json("Not authorized as an admin");
    }
    next();
  };
};
