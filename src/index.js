import "./styles/main.scss";
////////////////////////////
import { utils } from "./utils";
import { curriculum } from "./data";

const phrase1 = document.getElementById("js-phrase1");
const phrase2 = document.getElementById("js-phrase2");
const finsihed = document.getElementById("js-finsihed");
const phraseBtn = document.getElementById("js-phraseBtn");
const hideShowOppLang = document.getElementById("js-showOpposite");
const switchLang = document.getElementById("js-switchLang");
const exerciseDropdown = document.getElementById("js-selectedExercise");
const restart = document.getElementById("js-restartButton");
const selectedLanguage = document.getElementById("js-selectedLanguage");

// only works for one language - look into ways of supporting more than one language (store languages in object or array)
let changeLanguage = true;
let phrasesAlreadyCalled = [];

const getSelectedExercise = () => {
  return exerciseDropdown.value;
};

const getSelectedLanguage = () => {
  console.log(selectedLanguage.value);
  return selectedLanguage.value;
};

const changePhraseBtnText = () => {
  return utils.changeHtmlText([phraseBtn, "Next Phrase"]);
};

const randomiseExerciseText = exerciseArr => {
  return exerciseArr[utils.randomNumber(exerciseArr.length)];
};

const getExerciseText = alreadyCalledPhrases => {
  changePhraseBtnText();
  let selectedExercise = curriculum[getSelectedExercise()];
  const phrase = randomiseExerciseText(utils.convertObjToArr(selectedExercise));
  if (
    alreadyCalledPhrases.length >=
    utils.convertObjToArr(selectedExercise).length
  ) {
    // define global constants for copy in their own file (helps if you want to support different locales)
    return "You have finished!";
  } else if (alreadyCalledPhrases.includes(phrase)) {
    return getExerciseText(phrasesAlreadyCalled);
  } else if (!alreadyCalledPhrases.includes(phrase)) {
    alreadyCalledPhrases.push(phrase);
    return phrase;
  }
};

const showNextPhrase = () => {
  const selectLang = getSelectedLanguage();
  utils.switchClass(phrase2, "text-hide", "text-show");
  hideShowOppLang.innerHTML = "show";
  let strings = getExerciseText(phrasesAlreadyCalled);
  // think about phrasesPushArr needs to be a global variable
  // change below so that you can have for more than just spanish
  if (strings.en && strings.es) {
    if (changeLanguage) {
      utils.changeHtmlText([phrase1, strings.en], [phrase2, strings[selectLang]]);
    } else {
      utils.changeHtmlText([phrase2, strings.en], [phrase1, strings[selectLang]]);
    }
  } else {
    finsihed.innerHTML = strings;
    utils.changeHtmlText([phrase1, ""], [phrase2, ""]);
  }
};

const restartExercise = () => {
  phrasesAlreadyCalled = [];
  utils.changeHtmlText(
    [phrase1, ""],
    [phrase2, ""],
    [phraseBtn, "First Phrase"],
    [finsihed, ""]
  );
};

const oppLanguageFirst = () => {
  changeLanguage = !changeLanguage;
  if (changeLanguage) {
    utils.changeHtmlText([switchLang, "Spanish First"]);
  } else {
    utils.changeHtmlText([switchLang, "English First"]);
  }
  return changeLanguage;
};

const hideShowOppLangFunc = () => {
  if (phrase2.className === "text-hide") {
    utils.switchClass(phrase2, "text-show", "text-hide");
  } else {
    utils.switchClass(phrase2, "text-hide", "text-show");
  }
};

phraseBtn.addEventListener("click", showNextPhrase);
restart.addEventListener("click", restartExercise);
switchLang.addEventListener("click", oppLanguageFirst);
hideShowOppLang.addEventListener("click", hideShowOppLangFunc);

// write some unit tests for util functions
