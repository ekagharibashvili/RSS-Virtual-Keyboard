/* eslint-disable func-names */
/* Variables, constants, objects for implementing button models
and language parameters, while preserving the values in the LocalStorage */
const EN_KEYBOARD = [
  "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Delete",
  "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\",
  "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter",
  "ShiftLeft", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "ArrowUp", "ShiftRight",
  "ControlLeft", "MetaLeft", "AltLeft", "Space", "AltRight", "ControlRight", "ArrowLeft", "ArrowDown", "ArrowRight",
];
const KA_KEYBOARD = [
  ",,", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Delete",
  "Tab", "ქ", "წ", "ე", "რ", "ტ", "ყ", "უ", "ი", "ო", "პ", "[", "]", "~",
  "CapsLock", "ა", "ს", "დ", "ფ", "გ", "ჰ", "ჯ", "კ", "ლ", ";", "'", "Enter",
  "ShiftLeft", "ზ", "ხ", "ც", "ვ", "ბ", "ნ", "მ", ",", ".", "/", "ArrowUp", "ShiftRight",
  "ControlLeft", "MetaLeft", "AltLeft", "Space", "AltRight", "ControlRight", "ArrowLeft", "ArrowDown", "ArrowRight",
];
const CODE_KEYBOARD = [
  "Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace", "Delete",
  "Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash",
  "CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter",
  "ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight",
  "ControlLeft", "MetaLeft", "AltLeft", "Space", "AltRight", "ControlRight", "ArrowLeft", "ArrowDown", "ArrowRight",
];

const BODY = document.body;
const CAPSLOCK = {
  val: false,

  get value() {
    return this.val || false;
  },

  set value(val) {
    this.val = val;
  },

  reverse() {
    this.val = !this.val;
  },
};
const LANGUAGE = {
  val: "",

  get value() {
    this.val = this.getLanguageLocalStorage();
    return this.val || "en";
  },

  set value(val) {
    this.val = val;
  },

  reverse() {
    this.val = (this.val === "en") ? "ka" : "en";
    this.setLanguageLocalStorage(this.val);
  },

  getLanguageLocalStorage() {
    return localStorage.getItem("lang");
  },

  setLanguageLocalStorage(val) {
    localStorage.setItem("lang", val);
  },
};
localStorage.setItem("lang", LANGUAGE.value);

/* Methods for adding styles and keyboards to the project file. */
function addStyleToDocument(fileName) {
  const { head } = document;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = fileName;
  head.appendChild(link);
}
function initKeyboard(keyboardLayout) {
  const KEYBOARD = document.querySelector("#keyboard");
  const KEYS = document.querySelectorAll(".key");
  const keyboard = keyboardLayout === "en" ? EN_KEYBOARD : KA_KEYBOARD;

  if (KEYS.length) {
    for (let i = 0; i < keyboard.length; i += 1) {
      if (KEYS[i].classList[1] === "lowercase"
        || KEYS[i].classList[1] === "uppercase") {
        KEYS[i].innerHTML = keyboard[i];
      }
    }
  } else {
    // eslint-disable-next-line no-restricted-syntax
    for (const key of keyboard) {
      const btn = document.createElement("div");
      btn.classList.add("key");

      if (key.length === 1) {
        btn.innerHTML = key;
        btn.classList.add("lowercase");
      } else {
        switch (key) {
          case "ArrowUp":
            btn.innerHTML = "&#8657;";
            break;
          case "ArrowDown":
            btn.innerHTML = "&#8659;";
            break;
          case "ArrowLeft":
            btn.innerHTML = "&#8656;";
            break;
          case "ArrowRight":
            btn.innerHTML = "&#8658;";
            break;
          case "ShiftRight":
            btn.innerHTML = "Shift";
            break;
          case "ShiftLeft":
            btn.innerHTML = "Shift";
            break;
          case "ControlLeft":
            btn.innerHTML = "Ctrl";
            break;
          case "ControlRight":
            btn.innerHTML = "Ctrl";
            break;
          case "AltLeft":
            btn.innerHTML = "Alt";
            break;
          case "AltRight":
            btn.innerHTML = "Alt";
            break;
          case "MetaLeft":
            btn.innerHTML = "Win";
            break;
          case "Delete":
            btn.innerHTML = "Del";
            break;
          case "Backspace":
            btn.innerHTML = "&larr;";
            break;
          case "Space":
            btn.innerHTML = "\t";
            break;
          default:
            btn.innerHTML = key;
        }
        btn.classList.add(key);
      }

      KEYBOARD.appendChild(btn);
    }
  }
}

function init() {
  const wrapper = document.createElement("div");
  const header = document.createElement("h1");
  const textarea = document.createElement("textarea");
  const keyboard = document.createElement("div");
  const about = document.createElement("p");

  addStyleToDocument("./styles/style.css");
  wrapper.classList.add("wrapper");
  header.id = "header";
  header.innerText = "Virtual Keyboard";
  textarea.id = "textarea";
  textarea.cols = 100;
  textarea.rows = 10;
  keyboard.id = "keyboard";
  about.id = "about";
  about.innerText = "KeyBoard is created on Windows.\n changing language \"ALT\" + \"Ctrl\".";

  BODY.appendChild(wrapper);
  wrapper.appendChild(header);
  wrapper.appendChild(textarea);
  wrapper.appendChild(keyboard);
  wrapper.appendChild(about);

  initKeyboard(LANGUAGE.getLanguageLocalStorage());
}
init();

/* Method for adding values of pressed keyboard keys to an object Textarea. */
document.addEventListener("keydown", (event) => {
  const TEXTAREA = document.getElementById("textarea");
  const KEYS = document.querySelectorAll(".key");
  const { code } = event;
  // eslint-disable-next-line no-use-before-define
  addAnimationKey(event.code);

  if (event.key.length === 1 && event.key !== " ") {
    for (let i = 0; i < CODE_KEYBOARD.length; i += 1) {
      if (code === CODE_KEYBOARD[i]) {
        if (LANGUAGE.value === "en") {
          if (CAPSLOCK.value) {
            TEXTAREA.append(EN_KEYBOARD[i].toUpperCase());
          } else {
            TEXTAREA.append(EN_KEYBOARD[i]);
          }
        } else if (CAPSLOCK.value) {
          TEXTAREA.append(KA_KEYBOARD[i].toUpperCase());
          // console.log("KA", KA_KEYBOARD[i].toUpperCase());
        } else {
          TEXTAREA.append(KA_KEYBOARD[i]);
          // console.log("ka", KA_KEYBOARD[i]);
        }
      }
    }
  } else {
    switch (event.key) {
      case "CapsLock":
        CAPSLOCK.reverse();
        // eslint-disable-next-line no-restricted-syntax
        for (const key of KEYS) {
          if (CAPSLOCK.value) {
            key.classList.remove("lowercase");
            key.classList.add("uppercase");
          } else {
            key.classList.remove("uppercase");
            key.classList.add("lowercase");
          }
        }
        break;
      default:
      //  console.log(event.key);
        TEXTAREA.textContent.charCodeAt(event.code);
    }
  }
});

// Changing keyboard language
function changeLanguage(func, ...codes) {
  const pressed = new Set();

  document.addEventListener("keydown", (event) => {
    pressed.add(event.key);
    // eslint-disable-next-line no-use-before-define
    addAnimationKey(event.code);

    // eslint-disable-next-line no-restricted-syntax
    for (const key of codes) {
      if (!pressed.has(key)) {
        return;
      }
    }

    pressed.clear();
    func();
  });

  document.addEventListener("keyup", (event) => {
    pressed.delete(event.key);
    // eslint-disable-next-line no-use-before-define
    addAnimationKey(event.code);
  });
}

changeLanguage(() => {
  LANGUAGE.reverse();
  initKeyboard(LANGUAGE.value);
},
"Control", "Alt");

/* Method for adding animations when a button is clicked. */
function addAnimationKey(code) {
  // console.log(code);
  const keys = document.querySelectorAll(".key");

  for (let i = 0; i < CODE_KEYBOARD.length; i += 1) {
    if (CODE_KEYBOARD[i] === code) {
      // console.log(CODE_KEYBOARD[i], code);
      if (keys[i].style.animationName === "none") {
        keys[i].style.animationName = "active-btn";
      } else {
        keys[i].style.animationName = "none";
      }
    }
  }
}

// Method for using a key 'TAB' in Textarea.
// eslint-disable-next-line func-names
// eslint-disable-next-line consistent-return
document.getElementById("textarea").onkeydown = function (event) {
  if (event.keyCode === 9) {
    const s = this.selectionStart;
    this.value = `${this.value.substring(0, this.selectionStart)}\t${this.value.substring(this.selectionEnd)}`;
    this.selectionEnd = s + 1;
    return false;
  }
};

/* Method for implementing pressing a virtual keyboard key and
then adding the key value to the object Textarea. */
document.getElementById("keyboard").addEventListener("click", (event) => {
  const KEYS = document.querySelectorAll(".key");
  const TEXTAREA = document.getElementById("textarea");
  const text = event.target.innerHTML;

  if (event.target.style.animationName === "none") {
    // eslint-disable-next-line no-param-reassign
    event.target.style.animationName = "active-btn";
  } else {
    // eslint-disable-next-line no-param-reassign
    event.target.style.animationName = "none";
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const key of KEYS) {
    key.classList.remove("active");
  }

  if (event.target.classList.contains("key")) {
    // console.log(event.target.classList[1]);
    switch (event.target.classList[1]) {
      case "Tab":
        // eslint-disable-next-line no-case-declarations
        const s = TEXTAREA.selectionStart;
        TEXTAREA.value = `${TEXTAREA.value.substring(0, TEXTAREA.selectionStart)}\t${TEXTAREA.value.substring(TEXTAREA.selectionEnd)}`;
        TEXTAREA.selectionEnd = s + 1;
        break;
      case "CapsLock":
        // eslint-disable-next-line no-restricted-syntax
        for (const key of KEYS) {
          // eslint-disable-next-line no-undef
          if (!CAPS_FLAG.value) {
            key.classList.remove("lowercase");
            key.classList.add("uppercase");
          } else {
            key.classList.remove("uppercase");
            key.classList.add("lowercase");
          }
        }
        // eslint-disable-next-line no-undef
        CAPS_FLAG.value = !CAPS_FLAG.value;
        //  console.log(event.key);
        // console.log(CAPS_FLAG.value);
        break;
      case "Backspace":
        TEXTAREA.textContent = TEXTAREA.textContent.slice(0, TEXTAREA.textLength - 1);
        break;
      default:
        if (CAPSLOCK.value) {
          TEXTAREA.append(text.toUpperCase());
        } else {
          TEXTAREA.append(text);
        }
    }

    event.target.classList.add("active");
  }
});
