export const utils = {
  //returns random number
  randomNumber(length) {
    return Math.floor(Math.random() * length);
  },
  //converts object into array
  convertObjToArr(obj) {
    return Object.keys(obj).map(key => obj[key]);
  },

  //   for DOM
  //   changes tex of element
  changeHtmlText() {
    for (var i = 0; i < arguments.length; i++) {
      let id = arguments[i][0];
      let text = arguments[i][1];
      id.innerHTML = text;
    }
  },
  switchClass(id, classAdd, classRemove) {
    let add = id.classList.add(classAdd);
    let remove = id.classList.remove(classRemove);
    return { add, remove };
  }
};
