const yourName = "daiiz"; // Please change to your name

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const getChatTitle = () => {
  return $("title").textContent;
};

const getChatContents = () => {
  const res = [];
  const textElems = $$(".text-base");
  for (let i = 0; i < textElems.length; i++) {
    const textElem = textElems[i];
    const text = textElem.textContent;
    const imgElem = textElem.querySelector("img");
    const svgElem = textElem.querySelector("svg");

    let speaker = yourName;
    if (imgElem) {
      if (!yourName) {
        speaker = imgElem.getAttribute("alt") || "unknown";
      }
    } else if (svgElem) {
      speaker = "chatgpt";
    }
    const icon = `[${speaker.replace(/\s/g, "_")}.icon]`;

    res.push([icon, text]);
  }
  return res;
};

const createScrapboxLines = () => {
  const res = [];
  const title = getChatTitle();
  const contents = getChatContents();
  res.push(`[${title}]`);
  res.push(...contents.map(([icon, text]) => `\t${icon} ${text}`));
  return res;
};
