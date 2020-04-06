const R = require("ramda");
const utils = require("./utils");

const selectAnswer = R.pipe(
  R.flip(R.prop),
  R.defaultTo("?")
);

function expectChoice (choices, hex) {
  const choice = utils.hexDecode(String(hex));

  return choice + ": " + selectAnswer(choices, choice);
}

function expectList (values) {
  return R.map(utils.hexDecode, values);
}


Object.assign(module.exports, {
  selectAnswer,
  expectChoice,
  expectList,
});
