module.exports = () => {
  return async (req, res, next) => {
    if (!req.session || !req.session.user) {
      return res.status(403).json({
        message: "You are not authorized.",
      });
    }
    next();
  };
};
