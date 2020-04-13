const R = require("ramda");
const expect = require("expect");
const utils = require("./utils");

const answers = require("../data/answers");

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

function lookupAnswer (qid) {
  const path = R.split(".", qid);
  return R.path(path, answers);
}

function oxfordComma (list) {
  if (R.length(list) < 3) {
    return list;
  }

  const butlast = R.init(list);
  const last = "or " + R.last(list);

  return R.append(last, butlast);
}

function validateSpec (tests, expected, spec) {
  const specJSON = JSON.stringify(spec, null, 2);
  const pass = {};
  const results = utils.thread(tests, [
    R.reject(([ pred ]) => pred(spec)),
    R.map(([ _, msg]) => msg),
  ]);

  if (R.length(results)) {
    console.log("Throwing error", results);
    throw new Error(
      `Invalid question format. Expected ${expected}:\n`
      + `Problems:\n`
      + `- ${results.join("\n - ")}\n`
      + `Found:\n`
      + `${specJSON}`
    );
  }
}

function validateMultipleChoice (spec) {
  const isNotEmpty = R.complement(R.isEmpty);
  const expected = "{ id, question, choices, yourAnswer }";
  const tests = [
    [ R.has("id"), "No id" ],
    [ R.propIs(String, "id"), "id is not a string" ],
    [ R.has("question"), "No question" ],
    [ R.propIs(String, "question"), "question is not a string"],
    [ R.has("choices"), "No choices" ],
    [ R.propIs(Object, "choices"), "choices is not an object" ],
    [ R.propSatisfies(isNotEmpty, "choices"), "choices are empty" ],
    [ R.has("yourAnswer"), "yourAnswer key must be provided" ],
  ];

  validateSpec(tests, expected, spec);
}

function multipleChoice (questionSpec) {
  const { id, question, choices, yourAnswer: answer } = questionSpec;

  validateMultipleChoice(questionSpec);

  const correctAnswer = lookupAnswer(id);

  if (!correctAnswer) {
    throw new Error(`Question ${id} ${question} could not find a correct answer.`);
  }

  const selectedAnswer = R.path([ answer ], choices);
  const possibleAnswers = utils.thread(choices, [
    R.keys,
    R.map(choice => `"${choice}"`),
    oxfordComma,
    R.join(", "),
  ]);

  describe(question, () => {
    const choicesStr = JSON.stringify(choices, null, 2);

    if (answer === "_") {
      it("Select an answer", () => {
        const choicesStr = JSON.stringify(choices, null, 2);
        throw new Error(`Please answer the question. Try an answer like ${possibleAnswers}.`);
      });
      return;
    }

    if (!R.has(answer, choices)) {
      it("Invalid answer", () => {
         throw new Error(`Your answer should be a string like ${possibleAnswers}.`);
      });
      return;
    }

    if (answer !== correctAnswer) {
      it(`not ${selectedAnswer}`, () => {
        throw new Error(`Your answer was incorrect. Try again, you got this!`);
      });
      return;
    }

    if (selectedAnswer) {
      it(selectedAnswer, () => {
        expect(answer).toEqual(correctAnswer);
      });
    }
  });
}

function validateText (spec) {
  const isNotEmpty = R.complement(R.isEmpty);
  const expected = "{ id, question, choices, yourAnswer }";
  const tests = [
    [ R.has("id"), "No id" ],
    [ R.propIs(String, "id"), "id is not a string" ],
    [ R.has("question"), "No question" ],
    [ R.propIs(String, "question"), "question is not a string"],
    [ R.has("yourAnswer"), "yourAnswer key must be provided" ],
  ];

  validateSpec(tests, expected, spec);
}

function text (questionSpec) {
  const { id, question, example, yourAnswer: answer } = questionSpec;

  validateText(questionSpec);

  if (!id) {
    throw new Error(`Question ${question} is missing an id.`);
  }

  const correctAnswer = lookupAnswer(id);

  if (!correctAnswer) {
    throw new Error(`Question ${question} could not find a correct answer.`);
  }

  describe(question, () => {

    if (answer === "_") {
      it("Write an answer in js", () => {
        throw new Error(`Please answer the question. Try inputting an answer like ${example}.`);
      });
      return;
    }


    if (answer !== correctAnswer) {
      it(`${answer} is incorrect`, () => {
        throw new Error(`${answer} was incorrect. Try again, you got this!`);
      });
      return;
    }

    if (answer) {
      it(answer, () => {
        expect(answer).toEqual(correctAnswer);
      });
    }
  });
}

function lines (indent, linesList) {
  const firstLine = R.head(linesList);
  const restLines = R.tail(linesList);

  return firstLine + "\n" +
    utils.thread(restLines, [
      R.map(line => utils.thread("    ", [
        R.repeat(R.__, indent),
        R.join(""),
        R.concat(R.__, line),
      ])),
      R.join("\n"),
    ]);
}


Object.assign(module.exports, {
  selectAnswer,
  expectChoice,
  expectList,
  lines,
  multipleChoice,
  text,
});
