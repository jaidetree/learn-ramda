module.exports.hexEncode = function (str) {
  return new Buffer.from(str).toString("hex");
};

module.exports.hexDecode = function (str) {
  return new Buffer.from(str, "hex").toString("utf-8");
}
