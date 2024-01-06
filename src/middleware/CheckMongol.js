const { isValidObjectId } = require("mongoose");

const checkMongoId = (req, res, next) => {
  console.log("req.params", req.params);
  const { pid } = req.params;
  if (!isValidObjectId(pid)) return res.status(400).json({ msg: "Id inválido" });
  next();
}

module.exports = checkMongoId;