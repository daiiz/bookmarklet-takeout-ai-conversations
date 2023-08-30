import { extractChatGPTTexts } from "./src/chatgpt.js";
import { extractBardTexts } from "./src/bard.js";

// *: Change this line if needed
const config = Object.freeze({
  userName: "", // *
  chatgpt: {
    aiName: "chatgpt",
    hashtagLine: "#ChatGPT日記", // *
  },
  bard: {
    aiName: "bard",
    hashtagLine: "#Bard日記", // *
  },
  sge: {
    aiName: "sge",
    hashtagLine: "#SGE日記", // *
  },
});

const createScrapboxLines = (origin) => {
  const res = [];
  let data;
  if (origin === "https://chat.openai.com") {
    data = extractChatGPTTexts(config);
  } else if (origin === "https://bard.google.com") {
    data = extractBardTexts(config);
  }
  if (!data) {
    return res;
  }
  const { title, contents, hashtagLine } = data;
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

const main = () => {
  const origin = window.location.origin;
  copyToClipboard(createScrapboxLines(origin).join("\n"));
};

main();
