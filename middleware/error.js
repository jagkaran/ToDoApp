export const Errorhandler = (
  statusCode = 500,
  res,
  message = "Internal Server Error"
) => {
  return res.status(statusCode).json({ success: false, message });
};

export const asynError = (passedFunc) => (req, res) => {
  return Promise.resolve(passedFunc(req, res)).catch((err) => {
    return Errorhandler(500, res, err.message);
  });
};
