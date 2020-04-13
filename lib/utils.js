const R = require("ramda");

function hexEncode (str) {
  return new Buffer.from(str).toString("hex");
}

function hexDecode (str) {
  return new Buffer.from(str, "hex").toString("utf-8");
}

function thread (data, pipeline) {
  return R.pipe(...pipeline)(data);
}

Object.assign(module.exports, {
  hexEncode,
  hexDecode,
  thread,
});
