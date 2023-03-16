const yourName = ""; // Please change to your name
const chatgptName = "chatgpt";
const hashtagLine = "#ChatGPT日記"; // Please change to your favaorite hashtags

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
    const svgElem = textElem.querySelector(".rounded-sm svg");
    const imgElem = textElem.querySelector("img[alt]:not([alt=''])");

    let speaker = yourName;
    if (svgElem) {
      speaker = chatgptName;
    }
    if (imgElem && !yourName) {
      speaker = imgElem.alt || "me";
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
  res.push(new Date().toLocaleDateString(), "");
  res.push(...contents);
  res.push("", hashtagLine);
  return res;
};

const copyToClipboard = async (text) => {
  await navigator.clipboard.writeText(text);
  alert("Copied to clipboard!");
};

copyToClipboard(createScrapboxLines().join("\n"));
