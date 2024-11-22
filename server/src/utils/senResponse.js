const success = (
  res,
  message = "Request Successful",
  data = null,
  status = 200
) => {
  res.status(status);
  res.json({
    success: true,
    message,
    data,
  });
};

const failed = (res, message = "Request Failed", data = null, status = 500) => {
  res.status(status);
  res.json({
    success: false,
    message,
  });
};

const sendResponse = {
  success,
  failed,
};

module.exports = sendResponse;
