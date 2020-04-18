const R = require("ramda");
const expect = require("expect");

const quiz = require("../../lib/quiz");

describe("Course 1.2 - Composition", () => {
  quiz.multipleChoice({
    id: "2.1",
    question: "1. composing refers to...",
    choices: {
      a: "arranging of functions in a file",
      b: "the order of which functions are applied to data",
      c: "the outcome of reducing a list of functions together against a single piece of data",
      d: "the ability to combine functions together to form more complex functions",
    },
    yourAnswer: "d",
  });

  quiz.multipleChoice({
    id: "2.2",
    question: "2. When you compose 2 functions together you get ___?",
    choices: {
      a: "a function",
      b: "an array of functions",
      c: "two functions",
      d: "the last function composed",
    },
    yourAnswer: "a",
  });

  quiz.multipleChoice({
    id: "2.3",
    question: "3. What's the difference between R.pipe and R.compose?",
    choices: {
      a: "no difference, they both implement the same feature",
      b: "the order by which the functions supplied are ran against data",
      c: "the order by which arguments to each function are supplied",
      d: "the order by which they take data and a list of functions",
    },
    yourAnswer: "b",
  });

  quiz.multipleChoice({
    id: "2.4",
    question: "4. Composed functions are sometimes referred to as ___ ???",
    choices: {
      a: "compositions",
      b: "threads",
      c: "pipelines",
      d: "brilliant",
    },
    yourAnswer: "c",
  });

  function add2 (x) {
    return x + 2;
  }

  function mult3 (x) {
    return x * 3;
  }

  quiz.text({
    id: "2.5",
    question: quiz.lines(2, [
      "5. Given add2 and mult3, how do you manually compose them without Ramda?",
      "x(y(3)) = 11"
    ]),
    example: "x(y(z))",
    // answer in a js wrapped in a string
    yourAnswer: "add2(mult3(3))",
  });

  describe("6. What does R.compose do to functions?", () => {
    const __ = () => {};

    it("R.compose(add2, mult3)(3) === ???", () => {
      expect(add2(mult3(3)))
        // expected, should not be changed
        .toEqual(R.compose(add2, mult3)(3));
    });
  });

  describe("7. What does R.pipe do to functions?", () => {
    const __ = () => {};

    it("R.pipe(add2, mult3)(3) === ???", () => {
      // Put the correct function names in order to make this test pass
      expect(mult3(add2(3)))
        // expected, should not be changed
        .toEqual(R.pipe(add2, mult3)(3));
    });
  });

  describe("8. Complete the R.compose problem", () => {
    const __ = () => {};
    const input = [
      "michael sheen",
      "david tennant",
      "sian brooke",
      "ariyon bakare",
      "nick offerman",
    ];
    // You should not have to create any functions to solve these
    const sortByLastName = R.sortBy(R.last);
    const splitNames = R.map(R.split(" "));
    const joinNames = R.map(R.join(" "));
    const capitalize = R.map(R.map(s => R.toUpper(R.head(s)) + R.tail(s)));

    it("Split names into an array, capitalize both first and last names, sort by last name", () => {

      const namePipeline = R.compose(
        joinNames, sortByLastName, capitalize, splitNames
        // Provide the functions defined above in the correct order here
      );
      expect(namePipeline(input)).toEqual([
        "Ariyon Bakare",
        "Sian Brooke",
        "Nick Offerman",
        "Michael Sheen",
        "David Tennant",
      ]);
    });
  });

  describe("9. Complete the problem R.pipe this time", () => {
    const __ = () => {};
    const input = [
      "michael sheen",
      "david tennant",
      "sian brooke",
      "ariyon bakare",
      "nick offerman",
    ];
    // You should not have to create any functions to solve these
    const sortByLastName = R.sortBy(R.last);
    const splitNames = R.map(R.split(" "));
    const joinNames = R.map(R.join(" "));
    const capitalize = R.map(R.map(s => R.toUpper(R.head(s)) + R.tail(s)));

    it("Split names into an array, capitalize both first and last names, sort by last name", () => {

      const namePipeline = R.pipe(
        splitNames, capitalize, sortByLastName, joinNames
        // Provide the functions defined above in the correct order here
      );
      expect(namePipeline(input)).toEqual([
        "Ariyon Bakare",
        "Sian Brooke",
        "Nick Offerman",
        "Michael Sheen",
        "David Tennant",
      ]);
    });
  });

  describe("10. Challenge problem", () => {
    it("Use R.pipe to filter actors that were in Good Omens, sorted by character name, but only list the actor's name", () => {
      // You may use ramda functions or create your own for each step.
      const input = [
        {
          name: "Ted Dansen",
          character: "Michael",
          title: "Good Place",
        },
        {
          name: "David Tennant",
          character: "Crowley",
          title: "Good Omens",
        },
        {
          name: "Dan Aykroyd",
          character: "Ray Stantz",
          title: "Ghostbusters"
        },
        {
          name: "Adria Arjona",
          character: "Anathema Device",
          title: "Good Omens",
        },
        {
          name: "Julianna Margulies",
          character: "Alicia Florrick",
          title: "The Good Wife",
        },
        {
          name: "Michael Sheen",
          character: "Aziraphale",
          title: "Good Omens",
        },
        {
          name: "Kristen Bell",
          character: "Eleanor Shellstrop",
          title: "Good Place",
        },
      ];

      const goodOmens = R.filter(R.propEq('title', 'Good Omens'));
      const sortByCharacterName = R.sortBy(R.prop('character'));
      const actorNames = R.map(R.prop('name'));

      const yourPipeline = R.pipe(

        // This one is all you :)
        goodOmens, sortByCharacterName, actorNames
      );

      expect(yourPipeline(input)).toEqual([
        "Adria Arjona",
        "Michael Sheen",
        "David Tennant",
      ]);
    });
  });
});
