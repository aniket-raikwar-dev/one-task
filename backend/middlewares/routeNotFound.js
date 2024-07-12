const routeNotFoundError = (req, res) => {
  res.status(404).json({
    status: 404,
    route: req.originalUrl,
    error: "Route Not Found!",
  });
};

module.exports = routeNotFoundError;
