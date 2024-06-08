<template>
  <input v-model="message" placeholder="Editame" />
  <p>Mensaje Original: {{ message }}</p>
  <p>Mensaje Transformado: {{ headcount }}</p>
</template>

<script setup>
import { ref } from "vue";
import { computed } from "vue";

const message = ref("");
const transformPhrase = (phrase) => {
  const regexParentheses = /\(([^)]+)\)/g;
  const regexBrackets = /\[([^\]]+)\]/g;
  const wordLimit = 3;

  const resultAfterParentheses = phrase
    .toString()
    .replace(regexParentheses, (match, p1) => {
      return `(${inverPhrase(p1)})`;
    });

  const resultAfterBrackets = resultAfterParentheses
    .toString()
    .replace(regexBrackets, (match, p1) => {
      return `[${invertWords(p1)}]`;
    });

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

const headcount = computed(() => {
  return transformPhrase(message.value);
});
</script>
