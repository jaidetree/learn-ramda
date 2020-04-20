const R = require("ramda");
const expect = require("expect");

const quiz = require("../../lib/quiz");

describe("Course 1.3 - Currying", () => {
  quiz.multipleChoice({
    id: "3.1",
    question: "1. What best describes currying?",
    choices: {
      a: "Calling a function multiple times",
      b: "Calling a function for each argument of a curried function",
      c: "Functions that expect a set number of arguments, and will keep returning functions to collect arguments until it is able to apply them.",
      d: "A feature unique to Ramda to support functional composition by making each function unary meaning it will only take 1 argument at a time before applying it."
    },
    yourAnswer: "_",
  });

  quiz.multipleChoice({
    id: "3.2",
    question: "3. What is the practical value in curried functions?",
    choices: {
      a: "Improves the expressiveness of the code by supporting point-free style of coding.",
      b: "Allows you to provide different arguments over time in a program.",
      c: "Supports maximizing reusability by deriving more specific functions from general curried functions.",

      d: "All of the above",
    },
    yourAnswer: "_",
  }),

  quiz.multipleChoice({
    id: "3.3",
    question: "3. Do Ramda's curried functions only take 1 argument at a time?",
    choices: {
      a: "No. Ramda's functions can take multiple arguments at a time up until the required arguments are met.",
      b: "Yes. You can only specify one argument at a time to any curried Ramda function.",
    },
    yourAnswer: "_",
  });

  quiz.multipleChoice({
    id: "3.4",
    question: "4. What is the deciding factor for how many times a Ramda function can be curried?",
    choices: {
      a: "It's always going to be two. A function, and data.",
      b: "The type of args matching the signature of the function.",
      c: "The number of args, or .length of the original function.",
      d: "It must be manually specified, JS does not allow you to inspect how many arguments a function takes."
    },
    yourAnswer: "_",
  });

  quiz.multipleChoice({
    id: "3.5",
    question: "5. What happens if you call a curried function like R.map() with NO arguments?",
    choices: {
      a: "An error is thrown that none of the required arguments are specified.",
      b: "A function that takes one or two arguments.",
      c: "A function that takes only the mapper function argument",
      d: "A function that takes only the data implying R.identity as the mapper function argument.",
    },
    yourAnswer: "_",
  });

  quiz.multipleChoice({
    id: "3.6",
    question: "6. Is the function const mult = x => y => x * y curried?",
    choices: {
      a: "No. This is only a higher-order function.",
      b: "Yes. It is a higher-order function and could be considered manually curried."
    },
    yourAnswer: "_",
  });

  quiz.multipleChoice({
    id: "3.7",
    question: "7. What best explains point-free programming?",
    choices: {
      a: "An archaic style of programming limiting the use of variables and anonymous functions. This programming style is largely out of use today.",
      b: "Combining curried functions together into a more sophisticated curry function.",
      c: "Composing functions together that don't create a heavy set of stack points for JS's garabge collector to clean up and release allocated memory.",
      d: "Combining composition and currying to write useful functions that don't name any argument variables and declaratively describes the intended behavior."
    },
    yourAnswer: "_",
  });

  quiz.multipleChoice({
    id: "3.8",
    question: "8. When using a curried Ramda function, can you skip args?",
    choices: {
      a: "Yes. You can supply an rgument like R.__ as a placeholder.",
      b: "No. You must supply arguments in the exact order a curried function requires.",
      c: "Yes. You can supply an argument like null to act as a placeholder.",
      d: "Yes. You can create a custom function to wrap a curried function to skip arguments.",
    },
    yourAnswer: "_",
  });

  describe("8. Ramda's curried math functions", () => {
    it("8.1 mult2(3) === 6", () => {
      const mult2 = R.__(2);

      expect(mult2(3)).toEqual(6);
    });
    it("8.2 add2(3) === 5", () => {
      const add2 = R.__(2);

      expect(add2(3)).toEqual(5);
    });
    it("8.3 sub2(3) === -1", () => {
      const sub2 = R.__(2);

      expect(sub2(3)).toEqual(-1);
    });
    it("8.4 div2(4) === 0.5", () => {
      const div2 = R.__(2);

      expect(div2(4)).toEqual(0.5);
    });
  });

  describe("8. Ramda's curry placeholder", () => {
    it("Fix the function to look up keys on a known object", () => {
      const data = {
        a: 1,
        b: 2,
        c: 3,
      };
      // Replace null with the expected value to make this work.
      const get = R.prop(null, data);

      expect(get("a")).toEqual(1);
      expect(get("b")).toEqual(2);
      expect(get("c")).toEqual(3);
    });
  });

  describe("9. Create a half function using curried Ramda functions", () => {
    it("half(4) === 2", () => {
      // Replace null with your function definition
      const half = null;

      expect(half(4)).toEqual(2);
    });
  });

  describe("10. Challenge problem", () => {
    const LETTERS = " abcdefghijklmnopqrstuvwxyz";

    // You will need this
    function padLeft (num) {
      if (num < 10) {
        return "0" + num;
      }

      return num;
    }

    // Notes:
    // - Split the input string into an array of letters
    //   HINT: LETTERS.indexOf("b") => 1;
    // - Map each character to an index of letters
    // - Add 3 to the index
    // - Join the letters together into a single string

    it("Use curred functions to encode messages", () => {
      const encode = R.pipe(
      );

      expect(encode("ramda rules")).toEqual("18113410182112519");
    });
  });
});
