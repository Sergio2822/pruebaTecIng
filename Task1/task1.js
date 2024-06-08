const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const transformPhrase = (phrase) => {
  const regexParentheses = /\(([^)]+)\)/g;
  const regexBrackets = /\[([^\]]+)\]/g;
  const wordLimit = 3;

  const resultAfterParentheses = phrase.replace(
    regexParentheses,
    (match, p1) => {
      return `(${inverPhrase(p1)})`;
    }
  );

  const resultAfterBrackets = resultAfterParentheses.replace(
    regexBrackets,
    (match, p1) => {
      return `[${invertWords(p1)}]`;
    }
  );

  const resultAfterCountingWords = upperCaseByWordsCount(
    resultAfterBrackets,
    wordLimit
  );

  function inverPhrase(phrase) {
    let invertedText = "";
    for (let index = phrase.length - 1; index >= 0; index--) {
      invertedText += phrase[index];
    }

    return invertedText;
  }

  function invertWords(phrase) {
    const words = phrase.split(" ");

    const reversedWords = words.map((word) => {
      return word.split("").reverse().join("");
    });
    return reversedWords.join(" ");
  }

  function upperCaseByWordsCount(phrase, count) {
    const words = phrase.split(" ");

    if (words.length >= count) {
      words.forEach((word, index) => {
        if ((index + 1) % 2 === 0) {
          words[index] = word.toUpperCase();
        }
      });
      return words.join(" ");
    }

    return phrase;
  }

  return resultAfterCountingWords;
};

rl.question("Por favor, introduce tu cadena de texto: ", (textChain) => {
  console.log(transformPhrase(textChain, 3));

  rl.close();
});
