import mongoose from 'mongoose';

/**
 * Middleware kiểm tra ID có hợp lệ là MongoDB ObjectId không.
 * @param {string} paramName - Tên tham số trong req.params (mặc định là 'id')
 */
function validateObjectId(paramName = "id") {
  return function (req, res, next) {
    const id = req.params[paramName];

    // Nếu không có id hoặc không hợp lệ
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: `Tham số '${paramName}' không phải là ObjectId hợp lệ`,
      });
    }

    next(); // OK → chuyển sang controller
  };
}

export default validateObjectId;
