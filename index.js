const yourName = ""; // Please change to your name
const chatgptName = "chatgpt";
const hashtagLine = "#ChatGPTとの会話"; // Please change to your favaorite hashtags

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const getChatTitle = () => {
  return $("title").textContent;
};

const getChatContents = () => {
  const res = [];
  const textElems = $$("div.text-base");
  for (let i = 0; i < textElems.length; i++) {
    const textElem = textElems[i];
    const text = textElem.textContent;
    const imgElem = textElem.querySelector("img");
    const svgElem = textElem.querySelector("svg");

    let speaker = yourName;
    if (imgElem) {
      if (!yourName) {
        speaker = imgElem.getAttribute("alt") || "me";
      }
    } else if (svgElem) {
      speaker = chatgptName;
    }
    const icon = `[${speaker.replace(/\s/g, "_")}.icon]`;

    if (speaker === chatgptName) {
      const sents = text.split("\n");
      res.push(icon, ...sents.flatMap((sent) => ` ${sent}`), "");
    } else {
      res.push(`${icon} ${text}`);
    }
  }
  return res;
};

const createScrapboxLines = () => {
  const res = [];
  const title = getChatTitle();
  const contents = getChatContents();
  res.push(title);
  res.push(...contents);
  res.push("", hashtagLine);
  return res;
};

window.prompt("Result", createScrapboxLines().join("\n"));
